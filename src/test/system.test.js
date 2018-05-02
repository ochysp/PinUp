// TODO: Anpassung an eslint wenn Test geschrieben werden
/*
eslint-disable no-unused-vars,prefer-destructuring */
import React from 'react';

const expect = require('chai').use(require('sinon-chai')).expect;
const proxyquire = require('proxyquire');

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
const mockdatabase = new firebasemock.MockFirebase();
const mocksdk = new firebasemock.MockFirebaseSdk(path =>
  (path ? mockdatabase.child(path) : mockdatabase), () => mockauth);


const mySrc = proxyquire('../data/firebase/firebase.js', {
  firebase: mocksdk,
});
mockdatabase.autoFlush();

describe('Test a complete run with different Elements', () => {
  it('should work', () => {

  });
});
