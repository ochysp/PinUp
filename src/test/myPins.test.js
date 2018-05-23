import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';
import MyPins from '../components/MyPins';
import { deleteTestDbOnRootLevel, haltIfLiveDB } from './testHelpers';
import { authUser123, authUser573, setUpPins } from './testingSetup';

Enzyme.configure({ adapter: new Adapter() });

afterEach(() => {
  deleteTestDbOnRootLevel();
});

beforeEach(() => {
  haltIfLiveDB();
  deleteTestDbOnRootLevel();
  setUpPins();
});

describe('Test myPins', () => {
  describe('checks Listing', () => {
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
