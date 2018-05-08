// TODO: Anpassung an eslint wenn Test geschrieben werden
/*
eslint-disable no-unused-vars,prefer-destructuring */
import React from 'react';
import { shallow, mount, render } from 'enzyme';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';

const sinon = require('sinon');
const expect = require('chai').use(require('sinon-chai')).expect;

describe('Test Pin', () => {
  describe('#creatPin', () => {
    it('should create valid Pin', () => {
      // Content
    });
    it('should request Client to fill out missing Input / Informations', () => {
      // Content
    });
    it('should request Client to change Input to valid Values', () => {
      // Content
    });
  });

  describe('#changePin', () => {
    it('should update Pin with new Information', () => {
      // Content
    });
    it('should denie update and ask Client to add valid Input', () => {
      // Content
    });
  });

  describe('#deletePin', () => {
    it('should be deleted after Request from Client', () => {
      // Content
    });
    it('should get deleted after the "survival" Date', () => {
      // Might not that good testable due to "cleaning" function
      // which might just runs once every 24h
    });
  });
});
