/* eslint-disable import/prefer-default-export */
// @flow

import { auth } from './firebase';

export const doSignOut = () =>
  auth.signOut();
