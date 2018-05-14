import React from 'react';
import Enzyme, { mount } from 'enzyme';
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
const postInfoCategory0 = {
  userId: authUser573.uid,
  title: 'Bike-Tour',
  location: {
    latitude: parseFloat(47.23563352505248),
    longitude: parseFloat(8.845367431640627),
  },
  category: '0',
};
const postInfoCategory1 = {
  userId: authUser123.uid,
  title: 'Farmer Market',
  location: {
    latitude: parseFloat(47.23563352505248),
    longitude: parseFloat(8.845367431640627),
  },
  category: '1',
};
const postInfoCategory2 = {
  userId: authUser123.uid,
  title: 'Pub Tour',
  location: {
    latitude: parseFloat(47.23563352505211),
    longitude: parseFloat(8.845367431395730),
  },
  category: '2',
};
const postInfoShouldntMatch = {
  userId: authUser573.uid,
  title: 'Hiking',
  location: {
    latitude: parseFloat(67.23563352505248),
    longitude: parseFloat(9.845367431640627),
  },
  category: '0',
};

const setUpForUse = () => {
  createPin(
    pinInfoCategory02, () => { },
    (error) => { console.log('error:'); console.log(error); },
  );
  createPin(
    pinInfoCategory1, () => { },
    (error) => { console.log('error:'); console.log(error); },
  );
  createPin(
    pinInfoCategory0123, () => { },
    (error) => { console.log('error:'); console.log(error); },
  );
  createPost(
    postInfoCategory1, () => { },
    (error) => { console.log('error:'); console.log(error); },
  );
  createPost(
    postInfoCategory2, () => { },
    (error) => { console.log('error:'); console.log(error); },
  );
  createPost(
    postInfoCategory0, () => { },
    (error) => { console.log('error:'); console.log(error); },
  );
  createPost(
    postInfoShouldntMatch, () => { },
    (error) => { console.log('error'); console.log(error); },
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

describe('Test matching', () => {
  describe('#checks Listing', () => {
    it('should get matches of two different categories', () => {
      const PinsOfUser123 = mount(<MyPins authUser={authUser123} />);
      PinsOfUser123.find('ListItem').first().simulate('click');
      expect(PinsOfUser123.containsAllMatchingElements([
        <h3>
          {postInfoCategory0.title}
        </h3>,
        <h3>
          {postInfoCategory2.title}
        </h3>,
      ])).toEqual(true);
      expect(PinsOfUser123.containsAnyMatchingElements([
        <h3>
          {postInfoCategory1.title}
        </h3>,
        <h3>
          {postInfoShouldntMatch.title}
        </h3>,
      ])).toEqual(false);
    });
    it('should get matches of the specific category', () => {
      const PinsOfUser123 = mount(<MyPins authUser={authUser123} />);
      PinsOfUser123.find('ListItem').at(1).simulate('click');
      expect(PinsOfUser123.containsAllMatchingElements([
        <h3>
          {postInfoCategory1.title}
        </h3>,
      ])).toEqual(true);
      expect(PinsOfUser123.containsAnyMatchingElements([
        <h3>
          {postInfoCategory0.title}
        </h3>,
        <h3>
          {postInfoCategory2.title}
        </h3>,
        <h3>
          {postInfoShouldntMatch.title}
        </h3>,
      ])).toEqual(false);
    });
    it('should get matches of all the post within the radius', () => {
      const PinsOfUser573 = mount(<MyPins authUser={authUser573} />);
      PinsOfUser573.find('ListItem').first().simulate('click');
      expect(PinsOfUser573.containsAllMatchingElements([
        <h3>
          {postInfoCategory0.title}
        </h3>,
        <h3>
          {postInfoCategory1.title}
        </h3>,
        <h3>
          {postInfoCategory2.title}
        </h3>,
      ])).toEqual(true);
      expect(PinsOfUser573.containsAnyMatchingElements([
        <h3>
          {postInfoShouldntMatch.title}
        </h3>,
      ])).toEqual(false);
    });
  });
});
