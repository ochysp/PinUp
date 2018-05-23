import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';
import MyPosts from '../components/MyPosts';
import { deleteTestDbOnRootLevel, haltIfLiveDB } from './testHelpers';
import { authUser123, authUser573, setUpPosts } from './testingSetup';

Enzyme.configure({ adapter: new Adapter() });

afterEach(() => {
  deleteTestDbOnRootLevel();
});

beforeEach(() => {
  haltIfLiveDB();
  deleteTestDbOnRootLevel();
  setUpPosts();
});

describe('Test myPosts', () => {
  describe('checks Listing', () => {
    it('should create two different Lists of myPosts for Users', () => {
      const root = shallow(<MyPosts authUser={authUser123} />);
      const myPosts = root.find('MyPosts').dive();
      const root2 = shallow(<MyPosts authUser={authUser573} />);
      const myPosts2 = root2.find('MyPosts').dive();
      expect(myPosts.state().posts.length).toEqual(3);
      expect(myPosts2.state().posts.length).toEqual(3);
    });
  });
});
