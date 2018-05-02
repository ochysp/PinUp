// @flow

const firebase = require('firebase');

const config = {
  apiKey: 'AIzaSyCB8YV-RAEjpwxjixq-stzkSc_JZgQw-88',
  authDomain: 'pinup-cfc23.firebaseapp.com',
  databaseURL: 'https://pinup-cfc23.firebaseio.com',
  projectId: 'pinup-cfc23',
  storageBucket: 'pinup-cfc23.appspot.com',
  messagingSenderId: '522038590744',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const fb = firebase;


export { fb };


const auth = fb.auth();
const db = fb.database();

export { auth, db };
