// @flow

import * as firebase from 'firebase';
import config from './firebaseconfig';

if (!firebase.apps.length) {
  firebase.initializeApp(config());
}

const fb = firebase;


export { fb };


const auth = fb.auth();
const db = fb.database();

export { auth, db };
