// TODO: Anpassung an eslint wenn Test geschrieben werden
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';
import { listenForAllPinsOfUser } from '../business/Pin';
import CreatePinForm from '../components/Pin/CreatePinForm';

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

describe('Test Pin', () => {
  describe('#creatPin', () => {
    it('should create valid Pin', () => {
      function callback(data) {
        if (data.length) {
          expect(data.title).toBe('testpin456');
        }
      }

      const root = shallow(<CreatePinForm authUser={authUser} position={location} />);
      const pinForm = root.find('CreatePinForm').dive();
      pinForm.setState({
        title: 'testpin456',
        radius: 2,
        categories: ['2'],
        invalidSubmit: false,
      });
      const button = pinForm.find('[id="Save"]');
      button.simulate('click');

      listenForAllPinsOfUser(authUser.uid, callback);
    });
    it('should request Client to fill out missing Input / Informations', () => {
      // Content
    });
    it('should request Client to change Input to valid Values', () => {
      // Content
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
      // Might not that good testable due to "cleaning" function
      // which might just runs once every 24h
    });
  });
});
