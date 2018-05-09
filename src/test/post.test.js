import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';
import CreatePostForm from '../components/Post/CreatePostForm';
import { listenForAllPostsOfUser } from '../business/Post';
import { deleteTestDbOnRootLevel, haltIfLiveDB } from './testHelpers';
// import { PostType } from '../business/Types';

Enzyme.configure({ adapter: new Adapter() });

const authUser = {
  uid: '256',
  displayName: 'Karls Kramer',
  email: 'karlskramer@gmail.com',
  photoURL: null,
};
const location = {
  latitude: 47.22354,
  longitude: 8.81714,
};
const expectedPostData = {
  category: '0',
  location,
  title: 'testpost_1234',
  userId: authUser.uid,
};

afterEach(() => {
  deleteTestDbOnRootLevel();
});

beforeEach(() => {
  haltIfLiveDB();
  deleteTestDbOnRootLevel();
});

const createPost = () => {
  const root = shallow(<CreatePostForm authUser={authUser} position={location} />);
  const postForm = root.find('CreatePostForm').dive();

  postForm.setState({
    title: 'testpost_1234',
    category: '0',
    invalidSubmit: false,
    sentToDB: false,
    dialogIsActive: true,
  });
  const button = postForm.find('[id="Save"]');
  button.simulate('click');
  return postForm;
};

const doAfterPostCreation = (toDo) => {
  const postForm = createPost();
  function callback(data) {
    if (data.length && data.length > 0) {
      toDo(postForm, data);
    }
  }
  listenForAllPostsOfUser(authUser.uid, callback);
};

describe('Test Post', () => {
  it('should create valid Post', (done) => {
    const checkData = (postForm, data) => {
      // eslint-disable-next-line no-param-reassign
      delete data[0].postId;
      expect(data[0]).toEqual(expectedPostData);
      done();
    };
    doAfterPostCreation(checkData);
  });
  it('no Post created due to missing Entries', () => {

  });
});
