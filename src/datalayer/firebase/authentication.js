// @flow

import {auth} from './firebase';

export const doSignOut = () =>
    auth.signOut();
