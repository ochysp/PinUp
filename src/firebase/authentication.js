import { auth } from './firebase';

export const getUid = () =>
    auth.uid;

// Sign out
export const doSignOut = () =>
    auth.signOut();