import * as dbRef from '../constants/dbRef'
import {db} from '../data/firebase/firebase'
import {onOwn} from './Helper'

export const onOwnPins = (authUser, keyEntered, keyLeft) => {
  return onOwn(authUser, keyEntered, keyLeft, dbRef.USER_PINS);
};

export const onPin = (pinId, f) => db.ref(dbRef.PINS + pinId).on("value", f);

export const detachPin = pinId => db.ref(dbRef.PINS + pinId).off();

export const doCreatePin = pinInfo => {
  console.log("create")
  let newPinId = db.ref(dbRef.PINS).push({
    uid: pinInfo.authUser.uid,
    title: pinInfo.title,
    latitude: pinInfo.latitude,
    longitude: pinInfo.longitude,
    radius: pinInfo.radius
  }).key;
  db.ref(dbRef.USER_PINS + pinInfo.authUser.uid + "/" + newPinId).set({ _: 0 });
};

export const onAllPins = (userId, f) => {
  let allUserPins = db.ref(dbRef.PINS);
  allUserPins
    .orderByChild("uid")
    .equalTo(userId)
    .on("value", f);
};

export const detachAllPins = () => {
  db.ref(dbRef.PINS).off();
};

export const doDeletePin = (authUser, pinKey) => {
  db
    .ref(dbRef.PINS)
    .child(pinKey)
    .remove();
  db
    .ref(dbRef.USER_PINS + authUser.uid)
    .child(pinKey)
    .remove();
};
