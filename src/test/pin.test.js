import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';
import { listenForAllPinsOfUser } from '../business/Pin';
import CreatePinForm from '../components/Pin/CreatePinForm';
import { deleteTestDbOnRootLevel, haltIfLiveDB } from './testHelpers';

Enzyme.configure({ adapter: new Adapter() });

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
const pinData = {
  userId: authUser.uid,
  title: 'testpin456',
  area: {
    radius: 2,
    location,
  },
  categories: {
    2: true,
  },
};

afterEach(() => {
  deleteTestDbOnRootLevel();
});

beforeEach(() => {
  haltIfLiveDB();
  deleteTestDbOnRootLevel();
});

const createPin = (modifiedStateValue) => {
  const root = shallow(<CreatePinForm authUser={authUser} position={location} />);
  const pinForm = root.find('CreatePinForm').dive();
  if (modifiedStateValue === undefined) {
    pinForm.setState({
      title: 'testpin456',
      radius: 2,
      categories: ['2'],
      invalidSubmit: false,
    });
  } else {
    pinForm.setState(modifiedStateValue);
  }
  const button = pinForm.find('[id="Save"]');
  button.simulate('click');
  return pinForm;
};

const doAfterPinCreation = (toDo) => {
  const pinForm = createPin();
  function callback(data) {
    if (data.length && data.length > 0) {
      toDo(pinForm, data);
    }
  }
  listenForAllPinsOfUser(authUser.uid, callback);
};

describe('Test Pin', () => {
  describe('#creatPin', () => {
    it('should create valid Pin', (done) => {
      const checkData = (pinForm, data) => {
        // eslint-disable-next-line no-param-reassign
        delete data[0].pinId;
        expect(data[0]).toEqual(pinData);
        done();
      };
      doAfterPinCreation(checkData);
    });

    it('should request Client to fill out missing Input / Information', () => {
      const incompleteState = {
        title: 'pin_without_categories',
      };
      const incompletePinForm = createPin(incompleteState);
      expect(incompletePinForm.state().sentToDB).toEqual(false);
      expect(incompletePinForm.state().invalidSubmit).toEqual(true);
    });
  });
  describe('#changePin', () => {
    it('should update Pin with new Information', () => {
      // Content
    });
    it('should denie update and ask Client to add valid Input', () => {
      // Content
    });
  });

  describe('#deletePin', () => {
    it('should be deleted after Request from Client', () => {
      // Content
    });
    it('should get deleted after the "survival" Date', () => {
      // Might be hard to test here due to "cleaning" function
      // which might just runs once every 24h
    });
  });
});
