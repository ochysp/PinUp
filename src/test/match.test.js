import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';
import MyPins from '../components/MyPins';
import { createPin } from '../business/Pin';
import { createPost } from '../business/Post';
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
const pinInfoCategory02 = {
  userId: '123',
  title: 'Pin_1',
  area: {
    radius: 5,
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
const pinInfoCategory1 = {
  userId: '123',
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
const pinInfoCategory0123 = {
  userId: '573',
  title: 'Pin_1',
  area: {
    radius: 5,
    location: {
      latitude: parseFloat(47.23563352505248),
      longitude: parseFloat(8.845367431640627),
    },
  },
  categories: {
    0: true,
    1: true,
    2: true,
    3: true,
  },
};
const postInfoCategory1 = {
  userId: authUser123.uid,
  title: 'Post_1',
  location: {
    latitude: parseFloat(47.23563352505248),
    longitude: parseFloat(8.845367431640627),
  },
  category: '1',
};
const postInfoCategory2 = {
  userId: authUser123.uid,
  title: 'Post_2',
  location: {
    latitude: parseFloat(47.23563352505211),
    longitude: parseFloat(8.845367431395730),
  },
  category: '2',
};
const postInfoCategory0 = {
  userId: authUser573.uid,
  title: 'Post_1',
  location: {
    latitude: parseFloat(47.23563352505248),
    longitude: parseFloat(8.845367431640627),
  },
  category: '0',
};
const pinStatus = { ready1: false, ready2: false, ready3: false };
const postStatus = { ready1: false, ready2: false, ready3: false };

const setUpForUse = () => {
  createPin(
    pinInfoCategory02, () => { pinStatus.ready1 = true; },
    (error) => { console.log('error:'); console.log(error); },
  );
  createPin(
    pinInfoCategory1, () => { pinStatus.ready2 = true; },
    (error) => { console.log('error:'); console.log(error); },
  );
  createPin(
    pinInfoCategory0123, () => { pinStatus.ready3 = true; },
    (error) => { console.log('error:'); console.log(error); },
  );
  createPost(
    postInfoCategory1, () => { postStatus.ready1 = true; },
    (error) => { console.log('error:'); console.log(error); },
  );
  createPost(
    postInfoCategory2, () => { postStatus.ready2 = true; },
    (error) => { console.log('error:'); console.log(error); },
  );
  createPost(
    postInfoCategory0, () => { postStatus.ready3 = true; },
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
    it('should generate 3 Matching lists', () => {
      const root = shallow(<MyPins authUser={authUser123} />);
      const myPins = root.find('MyPins').dive();
      const root2 = shallow(<MyPins authUser={authUser573} />);
      const myPins2 = root2.find('MyPins').dive();
      console.log(myPins.state().pins);
      console.log(myPins2.state().pins);
      expect(myPins.state().pins.length).toEqual(2);
      expect(myPins2.state().pins.length).toEqual(1);
    });
  });
});
