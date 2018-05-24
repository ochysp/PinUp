/* eslint-disable import/prefer-default-export */
// @flow

import * as dbRef from '../constants/dbRef';
import { db } from '../data/firebase/firebase';
import type { KeyType, SnapshotType } from './Types';

export const doCreateUser = (
  userId: KeyType, name: string, email: string, imageUrl: ?string,
) =>
  db.ref(dbRef.USER_INFO + userId).set({
    username: name,
    email,
    profile_picture: imageUrl,
  });

export const getUserName = (userId: KeyType, callback: (username: string) => void) => db.ref(dbRef.USER_INFO + userId).once('value')
  .then((snapshot: SnapshotType) => {
    callback((snapshot.val() && snapshot.val().username) || 'Anonymous');
  });
