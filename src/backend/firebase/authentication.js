import { auth } from './firebase';

// Sign out
export const doSignOut = () =>
    auth.signOut();

