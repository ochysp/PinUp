import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// setTestRun activates the Firebase TestDB. It needs to be the first of all relative imports.
import '../data/firebase/setTestRun';
import MyPins from '../components/MyPins';
import { getMatchesOnce } from '../business/Match';
import { listenForPostData } from '../business/Post';
import { deleteTestDbOnRootLevel, haltIfLiveDB } from './testHelpers';
import { authUser123, authUser573, pinInfos, postInfos, setUpEverythingForUse } from './testingSetup';

Enzyme.configure({ adapter: new Adapter() });

afterEach(() => {
  deleteTestDbOnRootLevel();
});

beforeEach(() => {
  haltIfLiveDB();
  deleteTestDbOnRootLevel();
  setUpEverythingForUse();
});

describe('Test matching', () => {
  describe('checks Listing', () => {
    it('should get matches of one category', () => {
      const PinsOfUser123 = mount(<MyPins authUser={authUser123} />);
      PinsOfUser123.find('ListItem').first().simulate('click');
      expect(PinsOfUser123.containsAllMatchingElements([
        <h3>
          {postInfos.postInfoCategory2.title}
        </h3>,
      ])).toEqual(true);
      expect(PinsOfUser123.containsAnyMatchingElements([
        // first post should be out of reach (really close out of reach)
        <h3>
          {postInfos.postInfoCategory0.title}
        </h3>,
        // should be within reach but has not the matching category
        <h3>
          {postInfos.postInfoCategory1.title}
        </h3>,
        // should be way out of reach
        <h3>
          {postInfos.postInfoShouldntMatch.title}
        </h3>,
        <h3>
          {postInfos.postInfoCloseToPinRadiusButShouldntMatch.title}
        </h3>,
        <h3>
          {postInfos.postInfoWithinRadiusButNotSameCategoryShouldntMatch.title}
        </h3>,
      ])).toEqual(false);
    });
    it('should get matches of the specific category', () => {
      const PinsOfUser123 = mount(<MyPins authUser={authUser123} />);
      PinsOfUser123.find('ListItem').at(1).simulate('click');
      expect(PinsOfUser123.containsAllMatchingElements([
        <h3>
          {postInfos.postInfoCategory1.title}
        </h3>,
      ])).toEqual(true);
      expect(PinsOfUser123.containsAnyMatchingElements([
        <h3>
          {postInfos.postInfoCategory0.title}
        </h3>,
        <h3>
          {postInfos.postInfoCategory2.title}
        </h3>,
        <h3>
          {postInfos.postInfoShouldntMatch.title}
        </h3>,
        <h3>
          {postInfos.postInfoCloseToPinRadiusButShouldntMatch.title}
        </h3>,
        <h3>
          {postInfos.postInfoWithinRadiusButNotSameCategoryShouldntMatch.title}
        </h3>,
      ])).toEqual(false);
    });
    it('should get matches of all the post within the radius', () => {
      const PinsOfUser573 = mount(<MyPins authUser={authUser573} />);
      PinsOfUser573.find('ListItem').first().simulate('click');
      expect(PinsOfUser573.containsAllMatchingElements([
        <h3>
          {postInfos.postInfoCategory0.title}
        </h3>,
        <h3>
          {postInfos.postInfoCategory1.title}
        </h3>,
        <h3>
          {postInfos.postInfoCategory2.title}
        </h3>,
      ])).toEqual(true);
      expect(PinsOfUser573.containsAnyMatchingElements([
        <h3>
          {postInfos.postInfoShouldntMatch.title}
        </h3>,
        <h3>
          {postInfos.postInfoCloseToPinRadiusButShouldntMatch.title}
        </h3>,
        <h3>
          {postInfos.postInfoWithinRadiusButNotSameCategoryShouldntMatch.title}
        </h3>,
      ])).toEqual(false);
    });
  });
  describe('checks Match.js Functions', () => {
    it('should get matches of post ordered in expected order', (done) => {
      const wasChecked = [false, false, false];
      function postDetailCallback(actualPostInfo) {
        // eslint-disable-next-line no-param-reassign
        delete actualPostInfo.postId;
        switch (actualPostInfo.category) {
          case '0':
            expect(actualPostInfo).toEqual(postInfos.postInfoCategory0);
            wasChecked[0] = true;
            break;
          case '1':
            expect(actualPostInfo).toEqual(postInfos.postInfoCategory1);
            wasChecked[1] = true;
            break;
          case '2':
            expect(actualPostInfo).toEqual(postInfos.postInfoCategory2);
            wasChecked[2] = true;
            break;
          default:
            expect(actualPostInfo).contains(postInfos.postInfoShouldntMatch).toEqual(false);
        }
        if (wasChecked[0] && wasChecked[1] && wasChecked[2]) {
          done();
        }
      }
      function callback(data) {
        if (data) {
          expect(data.length).toEqual(3);
          data.forEach((postId) => {
            if (postId) {
              listenForPostData(postId, postDetailCallback);
            }
          });
        }
      }
      getMatchesOnce(
        pinInfos.pinInfoCategory0123.area, pinInfos.pinInfoCategory0123.categories, callback,
      );
    });
  });
});
