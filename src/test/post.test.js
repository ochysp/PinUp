// TODO: Anpassung an eslint wenn Test geschrieben werden

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';

Enzyme.configure({ adapter: new Adapter() });

const sinon = require('sinon');
const expect = require('chai').use(require('sinon-chai')).expect;

describe('Test Pin', () => {
  describe('#createPost', () => {
    it('should create valid Post', () => {
      // Content
    });
    it('should request Client to fill out missing Input / Informations', () => {
      // Content
    });
    it('should request Client to change Input to valid Values', () => {
      // Content
    });
  });

  describe('#changePost', () => {
    it('should update Pin with new Information', () => {
      // Content
    });
    it('should deny update and ask Client to add valid Input', () => {
      // Content
    });
  });

  describe('#deletePost', () => {
    it('should be deleted after Request from Client', () => {
      // Content
    });
    it('should get deleted after the "survival" Date', () => {
      // Might not that good testable due to "cleaning" function
      // which might just runs once every 24h
    });
  });
});
