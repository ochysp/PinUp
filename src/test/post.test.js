import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';
import CreateForm from '../components/FormComponents/CreateForm';
import { deletePost, listenForAllPostsOfUser } from '../business/Post';
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
  description: 'Text Sample',
  location,
  title: 'default_testpost_1234',
  userId: authUser.uid,
};

afterEach(() => {
  deleteTestDbOnRootLevel();
});

beforeEach(() => {
  haltIfLiveDB();
  deleteTestDbOnRootLevel();
});

const createPost = (modifiedStateValue) => {
  let data = {
    userId: authUser.uid,
    title: '',
    description: expectedPostData.description,
    location: expectedPostData.location,
    category: '',
  };
  if (modifiedStateValue === undefined) {
    data.title = expectedPostData.title;
    data.category = expectedPostData.category;
  } else {
    data = Object.assign(data, modifiedStateValue);
  }
  const root = shallow(<CreateForm
    variant="post"
    onDataChange={() => {}}
    onDone={() => {}}
    data={data}
  />);

  const postForm = root.find('CreateForm').dive();
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
  describe('createPost', () => {
    it('should create valid Post', (done) => {
      const checkData = (postForm, data) => {
      // eslint-disable-next-line no-param-reassign
        delete data[0].postId;
        expect(data[0]).toEqual(expectedPostData);
        done();
      };
      doAfterPostCreation(checkData);
    });
    it('should refuse to create Post and set invalidSubmit', () => {
      const incompleteState = {
        category: '0',
      };
      const incompletePostForm = createPost(incompleteState);
      expect(incompletePostForm.state().sentToDB).toEqual(false);
      expect(incompletePostForm.state().invalidSubmit).toEqual(true);
    });
  });
  describe('deletePost', () => {
    it('should be deleted after Request from Client', () => {
      createPost();
      const myPost = { postId: '' };
      function callbackThatContainsPost(data) {
        if (data.length && data.length > 0) {
          myPost.postId = data[0].postId;
        }
      }
      listenForAllPostsOfUser(authUser.uid, callbackThatContainsPost);
      deletePost(authUser.uid, myPost);
      function callbackWithoutPost(data) {
        expect(data.length).toEqual(0);
      }
      listenForAllPostsOfUser(authUser.uid, callbackWithoutPost);
    });
  });
});
