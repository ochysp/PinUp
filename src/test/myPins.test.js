import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';
import MyPins from '../components/MyPins';
import { createPin } from '../business/Pin';
import { deleteTestDbOnRootLevel, haltIfLiveDB } from './testHelpers';

Enzyme.configure({ adapter: new Adapter() });

const authUser123 = {
  uid: '123',
  displayName: 'Max Muster',
  email: 'maxmuster@gmail.com',
  photoURL: null,
};
const authUser573 = {
  uid: '573',
  displayName: 'Nicole Master',
  email: 'nicolemaster@gmail.com',
  photoURL: null,
};
const pinInfo1User123 = {
  userId: authUser123.uid,
  title: 'Pin_1',
  area: {
    radius: 2,
    location: {
      latitude: parseFloat(47.23563352505248),
      longitude: parseFloat(8.845367431640627),
    },
  },
  categories: {
    0: true,
    2: true,
  },
};
const pinInfo2User123 = {
  userId: authUser123.uid,
  title: 'Pin_2',
  area: {
    radius: 5,
    location: {
      latitude: parseFloat(47.23563352505211),
      longitude: parseFloat(8.845367431395730),
    },
  },
  categories: {
    1: true,
  },
};
const pinInfo1User573 = {
  userId: authUser573.uid,
  title: 'Pin_1',
  area: {
    radius: 3,
    location: {
      latitude: parseFloat(47.23563352505248),
      longitude: parseFloat(8.845367431640627),
    },
  },
  categories: {
    0: true,
  },
};
const status = { ready1: false, ready2: false, ready3: false };

const setUpForUse = () => {
  createPin(
    pinInfo1User123, () => { status.ready1 = true; },
    (error) => { console.log('error:'); console.log(error); },
  );
  createPin(
    pinInfo2User123, () => { status.ready2 = true; },
    (error) => { console.log('error:'); console.log(error); },
  );
  createPin(
    pinInfo1User573, () => { status.ready3 = true; },
    (error) => { console.log('error:'); console.log(error); },
  );
};

afterEach(() => {
  deleteTestDbOnRootLevel();
});

beforeEach(() => {
  haltIfLiveDB();
  deleteTestDbOnRootLevel();
  setUpForUse();
});

describe('Test myPosts', () => {
  describe('#checks Listing', () => {
    it('should create two different Lists of myPins for Users', () => {
      const root = shallow(<MyPins authUser={authUser123} />);
      const myPins = root.find('MyPins').dive();
      const root2 = shallow(<MyPins authUser={authUser573} />);
      const myPins2 = root2.find('MyPins').dive();
      expect(myPins.state().pins.length).toEqual(2);
      expect(myPins2.state().pins.length).toEqual(1);
    });
  });
});
