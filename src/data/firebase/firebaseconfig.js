// @flow
function Testing() {}

export const setTestrunStaticVar = () => {
  Testing.testRun = true;
};

const config = () => (Testing.testRun ? {
  apiKey: 'AIzaSyDD3ijy2I9WtWAPJ_v4wzaXV2VnwwB2R0Q',
  authDomain: 'pinup-testingdb.firebaseapp.com',
  databaseURL: 'https://pinup-testingdb.firebaseio.com',
  projectId: 'pinup-testingdb',
  storageBucket: 'pinup-testingdb.appspot.com',
  messagingSenderId: '233425895846',
} : {
  apiKey: 'AIzaSyCB8YV-RAEjpwxjixq-stzkSc_JZgQw-88',
  authDomain: 'pinup-cfc23.firebaseapp.com',
  databaseURL: 'https://pinup-cfc23.firebaseio.com',
  projectId: 'pinup-cfc23',
  storageBucket: 'pinup-cfc23.appspot.com',
  messagingSenderId: '522038590744',
});
export default config;

