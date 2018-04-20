// @flow

import * as GeoFire from 'geofire';
import * as dbRef from '../constants/dbRef';
import { db } from '../data/firebase/firebase';
import { attachChildListener } from './Helper';
import type {
  KeyType, LocationType, AuthUserType, KeyChangedCallback,
  ValueQueryCallback, PostType, SuccessCallback, ErrorCallback,
} from '../Types';

const createPostLocation = (
  key: KeyType, category: number, position: LocationType,
) => {
  const geoKey = db.ref(dbRef.postLocations(category));
  const geoFire = new GeoFire(geoKey);
  geoFire.set(key, [position.latitude, position.longitude]);
};

export const listenForPostsIDsOfUser = (
  authUser: AuthUserType, keyEntered: KeyChangedCallback, keyLeft: KeyChangedCallback,
) =>
  attachChildListener(
    keyEntered, keyLeft, dbRef.USER_POSTS + authUser.uid,
  );

export const listenForAllPostsOfUser = (userId: KeyType, callback: ValueQueryCallback) => {
  const allPosts = db.ref(dbRef.POSTS);
  allPosts
    .orderByChild('userId')
    .equalTo(userId)
    .on('value', callback);
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
  db
    .ref(`${dbRef.USER_POSTS + postInfo.userId}`)
    .update({ [newPostId]: true })
    .then(callbackOnSuccess, callbackOnError);
  createPostLocation(
    newPostId, postInfo.category, postInfo.location,
  );
};

export const deletePost = (authUser: AuthUserType, postData: PostType) => {
  db
    .ref(dbRef.POSTS)
    .child(postData.postId)
    .remove();
  db
    .ref(dbRef.USER_POSTS + authUser.uid)
    .child(postData.postId)
    .remove();
  db
    .ref(dbRef.postLocations(postData.category) + postData.postId)
    .remove();
};

export const detachAllPostListeners = () => {
  db.ref(dbRef.POSTS).off();
};

