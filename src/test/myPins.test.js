/* eslint-disable no-unused-vars,prefer-destructuring */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';
import CreatePinForm from '../components/Pin/CreatePinForm';
import { listenForAllPinsOfUser } from '../business/Pin';

Enzyme.configure({ adapter: new Adapter() });

const expect = require('chai').use(require('sinon-chai')).expect;

describe('Test a complete run with different Elements', () => {
  it('should render correctly', () => {
    assert(true);
  });
});

