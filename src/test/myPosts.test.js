// TODO: Anpassung an eslint wenn Test geschrieben werden

/* eslint-disable no-unused-vars,prefer-destructuring */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';
import MyPosts from '../components/MyPosts';
import { createPost, listenForPostData } from '../business/Post';
import { deleteTestDbOnRootLevel, haltIfLiveDB } from './testHelpers';

Enzyme.configure({ adapter: new Adapter() });

const postInfo1OfOwner1 = {
  userId: '123',
  title: 'Post_1',
  location: {
    latitude: parseFloat(47.23563352505248),
    longitude: parseFloat(8.845367431640627),
  },
  category: '1',
};
const postInfo2OfOwner1 = {
  userId: '123',
  title: 'Post_2',
  location: {
    latitude: parseFloat(47.23563352505211),
    longitude: parseFloat(8.845367431395730),
  },
  category: '2',
};
const postInfo1OfOwner2 = {
  userId: '573',
  title: 'Post_1',
  location: {
    latitude: parseFloat(47.23563352505248),
    longitude: parseFloat(8.845367431640627),
  },
  category: '0',
};
const status = { ready1: false, ready2: false, ready3: false };

const setUpForUse = () => {
  createPost(
    postInfo1OfOwner1, () => { status.ready1 = true; },
    (error) => { console.log('error:'); console.log(error); },
  );
  createPost(
    postInfo2OfOwner1, () => { status.ready2 = true; },
    (error) => { console.log('error:'); console.log(error); },
  );
  createPost(
    postInfo1OfOwner2, () => { status.ready3 = true; },
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
    it('should create two different Lists of myPosts for Users', () => {
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
      const root = shallow(<MyPosts authUser={authUser123} />);
      const myPosts = root.find('MyPosts').dive();
      const root2 = shallow(<MyPosts authUser={authUser573} />);
      const myPosts2 = root2.find('MyPosts').dive();
      expect(myPosts.state().posts.length).toEqual(2);
      expect(myPosts2.state().posts.length).toEqual(1);
    });
  });
});
