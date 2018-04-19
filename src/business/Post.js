// @flow

import * as GeoFire from 'geofire';
import * as dbRef from '../constants/dbRef';
import { db } from '../data/firebase/firebase';
import { attachChildListener } from './Helper';
import type {
  KeyType, LocationType, AuthUserType, KeyChangedCallback,
  ValueQueryCallback, PostInfoWithLocationType,
} from '../Types';

const createPostLocation = (key: KeyType, position: LocationType) => {
  const geoKey = db.ref(dbRef.POST_LOCATIONS);
  const geoFire = new GeoFire(geoKey);
  geoFire.set(key, [position.latitude, position.longitude]);
};

export const listenForPostsIDsOfUser = (
  authUser: AuthUserType, keyEntered: KeyChangedCallback, keyLeft: KeyChangedCallback,
) =>
  attachChildListener(
    keyEntered, keyLeft, dbRef.USER_POSTS + authUser.uid,
  );

export const listenForPostData = (postId: KeyType, callback: ValueQueryCallback) =>
  db.ref(dbRef.POSTS + postId).on('value', callback);

export const detachPostListener = (postId: KeyType) => db.ref(dbRef.POSTS + postId).off();

export const doCreatePost = (postInfo: PostInfoWithLocationType) => {
  const newPostId = db.ref(dbRef.POSTS).push({
    title: postInfo.title,
    category: postInfo.category,
  }).key;
  db
    .ref(`${dbRef.USER_POSTS + postInfo.userId}`)
    .update({ [newPostId]: true });
  createPostLocation(newPostId, postInfo.location);
};

export const doDeletePost = (authUser, postKey) => {
  db
    .ref(dbRef.POSTS)
    .child(postKey)
    .remove();
  db
    .ref(dbRef.USER_POSTS + authUser.uid)
    .child(postKey)
    .remove();
  db
    .ref(dbRef.POST_LOCATIONS + postKey)
    .remove();
};

export const listenForAllPosts = (uid, f) => {
  const allPosts = db.ref(dbRef.POST_LOCATIONS);
  allPosts
    .on('value', f);
};

export const detachAllPostListeners = () => {
  db.ref(dbRef.POSTS).off();
};

