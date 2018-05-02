// TODO: Anpassung an eslint wenn Test geschrieben werden
/*
eslint-disable no-unused-vars,prefer-destructuring */

import React from 'react';

import { doCreateUser } from '../business/User';

const expect = require('chai').use(require('sinon-chai')).expect;
const proxyquire = require('proxyquire');

const firebasemock = require('firebase-mock');

const mockdatabase = new firebasemock.MockFirebase();
const mockauth = new firebasemock.MockFirebase();
const mocksdk = new firebasemock.MockFirebaseSdk(path =>
  (path ? mockdatabase.child(path) : mockdatabase), () => mockauth);
const firebase = mocksdk.initializeApp(); // can take a path arg to database url

const mysource = proxyquire('../data/firebase/firebase.js', {
  firebase: mocksdk,
});

mockdatabase.autoFlush();

describe('#System Test', () => {
  it('should create valid Pin', () => {
    doCreateUser(
      '123', 'Max Muster', 'maxmuster@gmail.com', 'xyz',
    );
    expect(mockdatabase.child('userData').child('userInfo').child('123').getData());// .to.equal({'123'});
  });
});
