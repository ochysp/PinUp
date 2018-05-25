// @flow

import * as dbRef from '../constants/dbRef';
import { db } from '../data/firebase/firebase';
import type { KeyType, LocationType, AuthUserType, KeyChangedCallback, PostType, SuccessCallback, ErrorCallback, SnapshotType } from './Types';

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

export const listenForPostData = (postId: KeyType, callback: (postData: PostType) => void) =>
  db.ref(dbRef.POSTS + postId).on('value', (snapshot: SnapshotType) => {
    const post = snapshot.val();
    if (post) {
      post.postId = postId;
    }
    callback(post);
  });

export const detachPostListener = (postId: KeyType) => db.ref(dbRef.POSTS + postId).off();

const updatePost = (post: PostType) => {
  const { postId } = post;
  const postClone = Object.assign({}, post);
  delete postClone.postId;
  db.ref(dbRef.POSTS + postId).update(postClone);
};

export const savePost = (
  post: PostType,
  callbackOnSuccess: SuccessCallback,
  callbackOnError: ErrorCallback,
) => {
  if (post.postId) {
    updatePost(post);
  } else {
    const newPostId = db.ref(dbRef.POSTS).push(post).key;
    createPostLocation(
      newPostId, post.category, post.location, callbackOnSuccess, callbackOnError,
    );
  }
};

export const deletePost = (authUser: AuthUserType, postData: PostType) => {
  const { postId } = postData;
  db
    .ref(dbRef.POSTS)
    .child(postData.postId)
    .remove();
  db
    .ref(dbRef.postLocations(postData.category) + postId)
    .remove();
};

export const detachAllPostListeners = () => {
  db.ref(dbRef.POSTS).off();
};
