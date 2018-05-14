/* eslint-disable no-throw-literal */
import { db } from '../data/firebase/firebase';
import * as dbRef from '../constants/dbRef';
import { Testing } from '../data/firebase/firebaseconfig';

export const haltIfLiveDB = () => {
  if (!Testing.testRunConfigIsUsed) { throw 'Testing DB is not selected'; }
};

export const deleteTestDbOnRootLevel = () => {
  haltIfLiveDB();
  db
    .ref(dbRef.ROOT)
    .remove();
};

