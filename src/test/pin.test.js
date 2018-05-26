import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';
import { convertCategoryArrayToObject, deletePin, listenForAllPinsOfUser } from '../business/Pin';
import EditingForm from '../components/FormComponents/EditingForm';
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
  let data = {
    userId: authUser.uid,
    title: '',
    area: { location, radius: pinData.area.radius },
    categories: {},
  };
  if (modifiedStateValue === undefined) {
    data.title = pinData.title;
    data.categories = pinData.categories;
  } else {
    data = Object.assign(data, modifiedStateValue);
  }
  const root = shallow(<EditingForm
    variant="pin"
    onDataChange={() => {}}
    onDone={() => {}}
    data={data}
  />);
  const pinForm = root.find('EditingForm').dive();
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
  describe('creatPin', () => {
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
  describe('changePin', () => {
    it('should update Pin with new Information', () => {
      // Content
    });
    it('should denie update and ask Client to add valid Input', () => {
      // Content
    });
  });
  describe('deletePin', () => {
    it('should be deleted after Request from Client', () => {
      createPin();
      const myPin = { pinId: '' };
      function callbackThatContainsPin(data) {
        if (data.length && data.length > 0) {
          myPin.pinId = data[0].pinId;
        }
      }
      listenForAllPinsOfUser(authUser.uid, callbackThatContainsPin);
      deletePin(authUser.uid, myPin.pinId);
      function callbackWithoutPin(data) {
        expect(data.length).toEqual(0);
      }
      listenForAllPinsOfUser(authUser.uid, callbackWithoutPin);
    });
  });
  describe('convertCategoryToObject', () => {
    it('should return an Array of objects', () => {
      const categories = ['0', '2', '3'];
      const categoriesAsObject = convertCategoryArrayToObject(categories);
      expect(categoriesAsObject).toEqual({ 0: true, 2: true, 3: true });
    });
  });
});
