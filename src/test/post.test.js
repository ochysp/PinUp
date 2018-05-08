/* eslint-disable no-unused-vars,prefer-destructuring */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';
import { CATEGORIES } from '../constants/categories';
import CreatePostForm from '../components/Post/CreatePostForm';
import { listenForAllPostsOfUser } from '../business/Post';
import { deleteTestDbOnRootLevel, haltIfLiveDB } from './testHelpers';

Enzyme.configure({ adapter: new Adapter() });

afterEach(() => {
  deleteTestDbOnRootLevel();
});

beforeEach(() => {
  haltIfLiveDB();
  deleteTestDbOnRootLevel();
});

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
    const postForm = shallow(<CreatePostForm authUser={authUser} position={location} />);


    function callback(data) {
      expect(data).toBe('peanut butter jelly time');
      done();
    }

    const pf = postForm.find('CreatePostForm').dive();
    pf.setState({
      title: 'testpost1234',
      category: CATEGORIES[0],
      invalidSubmit: false,
      sentToDB: false,
      dialogIsActive: true,
    });
    const state1 = pf.state;
    const button = pf.find('[id="Save"]');
    button.simulate('click');

    const state2 = pf.state;

    console.log(state2);
    // console.log(postForm.debug());
    const x = 0;
  });
  it('', () => {
  });
});
