// TODO: Anpassung an eslint wenn Test geschrieben werden
/*
eslint-disable no-unused-vars,prefer-destructuring */
import React from 'react';
import { shallow, mount, render } from 'enzyme';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';

const sinon = require('sinon');
const expect = require('chai').use(require('sinon-chai')).expect;

// Tests the login functionality of firebase
describe('Test Pin creating', () => {
  describe('#getmaches', () => {
    it('should contain certain Posts', () => {
      // Content
    });
    it('should contain no matching Posts', () => {
      // Content
    });
    it('should contain any Post that is in within Radius', () => {
      // Content
    });
    it('should lose one Post during actual update', () => {
      // Content
    });
  });
});
