// @flow

import * as dbRef from '../constants/dbRef';
import { db } from '../data/firebase/firebase';
import type { AuthUserType, ValueQueryCallback, PinType, KeyType, SuccessCallback, ErrorCallback, CategoriesType, SnapshotType } from './Types';
import { getMatchesOnce } from './Match';

export const listenForPinData = (pinId: string, callback: ValueQueryCallback) =>
  db.ref(dbRef.PINS + pinId).on('value', callback);

export const detachPinListener = (pinId: KeyType) =>
  db.ref(dbRef.PINS + pinId).off();

const updatePin = (pin: PinType) => {
  const pinClone = Object.assign({}, pin);
  delete pinClone.pinId; // so that the location of the Post wont change
  db.ref(dbRef.PINS + pin.pinId).update(pinClone);
};

export const savePin = (
  pin: PinType,
  callbackOnSuccess: SuccessCallback,
  callbackOnError: ErrorCallback,
) => {
  if (pin.pinId) {
    updatePin(pin);
  } else {
    db.ref(dbRef.PINS)
      .push(pin)
      .then(callbackOnSuccess, callbackOnError);
  }
};

const convertPinsSnapshotToArray = (snapshot: SnapshotType) => {
  if (snapshot.val() === null) {
    return [];
  }
  return Object.entries(snapshot.val()).map(([key, value]: [string, any]) => ({
    pinId: key,
    ...value,
  }));
};

export const listenForAllPinsWithMatchesOfUser =
  (userId: KeyType, callback: (PinType[]) => void) => {
    const allPins = db.ref(dbRef.PINS);
    allPins
      .orderByChild('userId')
      .equalTo(userId)
      .on('value', (snapshot: SnapshotType) => {
        const pinArray = convertPinsSnapshotToArray(snapshot);
        if (!pinArray.length) { callback([]); }
        pinArray.forEach((pin) => {
          getMatchesOnce(
            pin.area, pin.categories, (pinIds) => {
              // eslint-disable-next-line no-param-reassign
              pin.matches = pinIds;
              callback(pinArray);
            },
          );
        });
      });
  };

export const listenForAllPinsOfUser = (userId: KeyType, callback: (PinType[]) => void) => {
  const allPins = db.ref(dbRef.PINS);
  allPins
    .orderByChild('userId')
    .equalTo(userId)
    .on('value', (snapshot: SnapshotType) => callback(convertPinsSnapshotToArray(snapshot)));
};

export const detachAllPinListeners = () => {
  db.ref(dbRef.PINS).off();
};

export const deletePin = (authUser: AuthUserType, pinKey: KeyType) => {
  db.ref(dbRef.PINS).child(pinKey).remove();
};

export const convertCategoryArrayToObject = (categoryArray: string[]): CategoriesType => {
  const categoriesObject = {};
  categoryArray.forEach((categoryNr) => {
    categoriesObject[categoryNr] = true;
  });
  return categoriesObject;
};

export const convertCategoryObjectToArray = (categoryObject: CategoriesType): string[] =>
  Object.keys(categoryObject).map(key => key.toString());
