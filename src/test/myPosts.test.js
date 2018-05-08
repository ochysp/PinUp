// TODO: Anpassung an eslint wenn Test geschrieben werden

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
  it('should render correctly', (done) => {
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


    function callback(data) {
      expect(data).toBe('peanut butter');
    }


    const pf = pinForm.find('CreatePinForm').dive();
    pf.setState({
      title: 'testpost',
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

/*
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
*/
