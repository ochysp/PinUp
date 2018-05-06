/* eslint-disable no-unused-vars,prefer-destructuring */
import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CreatePinForm from '../components/Pin/CreatePinForm';

Enzyme.configure({ adapter: new Adapter() });

const sinon = require('sinon');
const expect = require('chai').use(require('sinon-chai')).expect;
const proxyquire = require('proxyquire');

const testDBconfig = {
  apiKey: 'AIzaSyDD3ijy2I9WtWAPJ_v4wzaXV2VnwwB2R0Q',
  authDomain: 'pinup-testingdb.firebaseapp.com',
  databaseURL: 'https://pinup-testingdb.firebaseio.com',
  projectId: 'pinup-testingdb',
  storageBucket: 'pinup-testingdb.appspot.com',
  messagingSenderId: '233425895846',
};

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

proxyquire('../data/firebase/firebaseconfig.js', {
  config: testDBconfig,
});

const pinForm = mount(<CreatePinForm authUser={authUser} position={location} />);

describe('Test a complete run with different Elements', () => {
  it('should render correctly', () => {
    // eslint-disable-next-line no-undef
    // browserRouter = mount(<App />);
    pinForm.setState({
      title: 'TestPin1',
      radius: 10,
      categories: [0, 2],
    });
    console.log(pinForm.find('button'));
    pinForm.find('button').simulate('click');
  });
  it('', () => {
  });
});
