// @flow

import * as GeoFire from 'geofire';
import * as dbRef from '../constants/dbRef';
import { db } from '../datalayer/firebase/firebase';
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
  }).key;
  db
    .ref(`${dbRef.USER_POSTS + postInfo.userId}`)
    .update({ [newPostId]: true });
  createPostLocation(newPostId, postInfo.location);
};

