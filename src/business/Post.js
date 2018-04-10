import * as dbRef from '../constants/dbRef'
import {db} from '../datalayer/firebase/firebase'
import {onOwn} from './Helper'
import * as GeoFire from 'geofire'

export const onOwnPosts = (authUser, keyEntered, keyLeft) => {
  return onOwn(authUser, keyEntered, keyLeft, dbRef.USER_POSTS);
};

export const onPost = (postId, f) =>
  db.ref(dbRef.POSTS + postId).on("value", f);

export const detachPost = postId => db.ref(dbRef.POSTS + postId).off();

export const doCreatePost = postInfo => {
  let newPostId = db.ref(dbRef.POSTS).push({
    title: postInfo.title
  }).key;
  db
    .ref(dbRef.USER_POSTS + postInfo.authUser.uid + "/" + newPostId)
    .set({ _: 0 });
  createPostLocation(newPostId, postInfo.latitude, postInfo.longitude);
};

const createPostLocation = (key, latitude, longitude) => {
  let geoKey = db.ref(dbRef.POST_LOCATIONS);
  let geoFire = new GeoFire(geoKey);
  geoFire.set(key, [latitude, longitude]);
};