// @flow

import * as dbRef from '../constants/dbRef';
import type { AuthUserType, ErrorCallback, SuccessCallback, KeyType } from './Types';
import { db } from '../data/firebase/firebase';

export const doSignUpForEvent = (
  postIdOfEvent: KeyType, authUser: AuthUserType,
  callbackOnSuccess: SuccessCallback, callbackOnError: ErrorCallback,
) => {
  db
    .ref(`${dbRef.POSTS + postIdOfEvent}`)
    .child('event')
    .child('participants')
    .update({ [authUser.uid]: Date.now() })
    .then(callbackOnSuccess, callbackOnError);
};

export const doSignOutOfEvent = (
  postIdOfEvent: KeyType, authUser: AuthUserType,
  callbackOnSuccess: SuccessCallback, callbackOnError: ErrorCallback,
) => {
  db
    .ref(`${dbRef.POSTS + postIdOfEvent}`)
    .child('event')
    .child('participants')
    .child(authUser.uid)
    .remove()
    .then(callbackOnSuccess, callbackOnError);
};
