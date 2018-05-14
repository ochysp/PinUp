// @flow

import * as dbRef from '../constants/dbRef';
import { db } from '../data/firebase/firebase';
import type {
  KeyType, LocationType, AuthUserType, KeyChangedCallback,
  ValueQueryCallback, PostType, SuccessCallback, ErrorCallback, SnapshotType,
} from './Types';

const GeoFire = require('geofire');

const createPostLocation = (
  key: KeyType,
  categoryId: string,
  position: LocationType,
  callbackOnSuccess: SuccessCallback,
  callbackOnError: ErrorCallback,
) => {
  const geoKey = db.ref(dbRef.postLocations(categoryId));
  const geoFire = new GeoFire(geoKey);
  geoFire.set(key, [position.latitude, position.longitude])
    .then(callbackOnSuccess, callbackOnError);
};

export const listenForPostsIDsOfUser = (
  authUser: AuthUserType, keyEntered: KeyChangedCallback, keyLeft: KeyChangedCallback,
) => {
  const ref = db.ref(dbRef.POSTS)
    .orderByChild('userId')
    .equalTo(authUser.uid);

  ref.on('child_added', snapshot => keyEntered(snapshot.key));
  ref.on('child_removed', snapshot => keyLeft(snapshot.key));
};


const convertPostsSnapshotToArray = (snapshot: SnapshotType) => {
  if (snapshot.val() === null) {
    return [];
  }
  return Object.entries(snapshot.val()).map(([key, value]: [string, any]) => ({
    postId: key,
    ...value,
  }));
};

export const listenForAllPostsOfUser = (userId: KeyType, callback: (PostType[]) => void) => {
  const allPosts = db.ref(dbRef.POSTS);
  allPosts
    .orderByChild('userId')
    .equalTo(userId)
    .on('value', (snapshot: SnapshotType) => callback(convertPostsSnapshotToArray(snapshot)));
};

export const listenForPostData = (postId: KeyType, callback: ValueQueryCallback) =>
  db.ref(dbRef.POSTS + postId).on('value', callback);

export const detachPostListener = (postId: KeyType) => db.ref(dbRef.POSTS + postId).off();

export const createPost = (
  postInfo: PostType,
  callbackOnSuccess: SuccessCallback,
  callbackOnError: ErrorCallback,
) => {
  const newPostId = db.ref(dbRef.POSTS).push(postInfo).key;
  createPostLocation(
    newPostId, postInfo.category, postInfo.location, callbackOnSuccess, callbackOnError,
  );
};

export const deletePost = (authUser: AuthUserType, postData: PostType) => {
  if (postData.postId) {
    const { postId } = postData;
    db
      .ref(dbRef.POSTS)
      .child(postData.postId)
      .remove();
    db
      .ref(dbRef.postLocations(postData.category) + postId)
      .remove();
  } else {
    // eslint-disable-next-line no-throw-literal
    throw 'Could not delete Post: No PostId provided';
  }
};

export const detachAllPostListeners = () => {
  db.ref(dbRef.POSTS).off();
};
