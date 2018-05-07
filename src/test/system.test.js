/* eslint-disable no-unused-vars,prefer-destructuring */
import { setTestrun } from '../data/firebase/setTestRun';
import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CreatePinForm from '../components/Pin/CreatePinForm';

Enzyme.configure({ adapter: new Adapter() });

const sinon = require('sinon');
const expect = require('chai').use(require('sinon-chai')).expect;

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

const pinForm = shallow(<CreatePinForm authUser={authUser} position={location} />);

describe('Test a complete run with different Elements', () => {
  it('should render correctly', (done) => {
    // eslint-disable-next-line no-undef

    function callback(data) {
      expect(data).toBe('peanut butter');
    }


    const pf = pinForm.find('CreatePinForm').dive();
    pf.setState({
      title: "testpost",
      radius: 5,
      categories: ['2'],
      invalidSubmit: false,
    });
    const state1 = pf.state;
    const button = pf.find('[id="Save"]');
    button.simulate('click');


    const state2 = pf.state;

    // console.log(pinForm.debug());
    const x = 0;
  });
  it('', () => {
  });
});
