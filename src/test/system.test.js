/* eslint-disable no-unused-vars,prefer-destructuring */
import React from 'react';
import { doCreateUser } from '../business/User';

const sinon = require('sinon');
const expect = require('chai').use(require('sinon-chai')).expect;
const proxyquire = require('proxyquire');

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
const mockdatabase = new firebasemock.MockFirebase();
const mocksdk = new firebasemock.MockFirebaseSdk(path =>
  (path ? mockdatabase.child(path) : mockdatabase), () => mockauth);
mocksdk.initializeApp();


proxyquire('../data/firebase/firebase.js', {
  db: mockdatabase,
});
mockdatabase.autoFlush(true);
const authUser = {
  uid: '123',
  displayName: 'Max Muster',
  email: 'maxmuster@gmail.com',
  photoURL: null,
};
const location = {
  latitude: 47.22354,
  longitude: 8.81714,
};

describe('Test a complete run with different Elements', () => {
  it('should go fuck itself', () => {
    doCreateUser(
      '123', 'Max Muster', 'maxmuster@gmail.com', null,
    );
    /*
    expect(mockdatabase.child('userData').child('userInfo').getData()).to.equal({
      123: {
        email: 'maxmuster@gmail.com',
        username: 'Max Muster',
      },
    }); */
  });
});
