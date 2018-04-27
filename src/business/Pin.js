// @flow

import * as dbRef from '../constants/dbRef';
import { db } from '../data/firebase/firebase';
import { attachChildListener } from './Helper';
import type {
  AuthUserType,
  KeyChangedCallback,
  ValueQueryCallback,
  PinType,
  KeyType,
  SuccessCallback, ErrorCallback, CategoriesType,
} from './Types';

export const listenForAllPinIDsOfUser = (
  authUser: AuthUserType, keyEntered: KeyChangedCallback, keyLeft: KeyChangedCallback,
) =>
  attachChildListener(
    keyEntered, keyLeft, dbRef.USER_PINS + authUser.uid,
  );

export const listenForPinData = (pinId: string, callback: ValueQueryCallback) =>
  db.ref(dbRef.PINS + pinId).on('value', callback);

export const detachPinListener = (pinId: KeyType) =>
  db.ref(dbRef.PINS + pinId).off();

export const createPin = (
  pinInfo: PinType,
  callbackOnSuccess: SuccessCallback,
  callbackOnError: ErrorCallback,
) => {
  const newPinId = db.ref(dbRef.PINS)
    .push(pinInfo).key;
  db
    .ref(`${dbRef.USER_PINS + pinInfo.userId}`)
    .update({ [newPinId]: true })
    .then(callbackOnSuccess, callbackOnError);
};

export const listenForAllPinsOfUser = (userId: KeyType, callback: ValueQueryCallback) => {
  const allPins = db.ref(dbRef.PINS);
  allPins
    .orderByChild('userId')
    .equalTo(userId)
    .on('value', callback);
};

export const detachAllPinListeners = () => {
  db.ref(dbRef.PINS).off();
};

export const deletePin = (authUser: AuthUserType, pinKey: KeyType) => {
  db
    .ref(dbRef.PINS)
    .child(pinKey)
    .remove();
  db
    .ref(dbRef.USER_PINS + authUser.uid)
    .child(pinKey)
    .remove();
};

export const convertCategoryArrayToObject = (categoryArray: string[]): CategoriesType => {
  const categoriesObject = {};
  categoryArray.forEach((categoryNr) => {
    categoriesObject[categoryNr] = true;
  });
  return categoriesObject;
};
