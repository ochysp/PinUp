/* eslint-disable import/prefer-default-export */
// @flow

import * as dbRef from '../constants/dbRef';
import { db } from '../datalayer/firebase/firebase';
import type { KeyType } from '../Types';

export const doCreateUser = (
  userId: KeyType, name: string, email: string, imageUrl: ?string,
) =>
  db.ref(dbRef.USER_INFO + userId).set({
    username: name,
    email,
    profile_picture: imageUrl,
  });
