import { db } from "./firebase";
import * as GeoFire from "geofire";
import * as dbRef from "../../constants/dbRef";

// User API

export const doCreateUser = (userId, name, email, imageUrl) =>
  db.ref(dbRef.USER_INFO + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  });

// Post APIs ...

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

// Pin APIs ...
export const onOwnPins = (authUser, keyEntered, keyLeft) => {
  return onOwn(authUser, keyEntered, keyLeft, dbRef.USER_PINS);
};

export const onPin = (pinId, f) => db.ref(dbRef.PINS + pinId).on("value", f);

export const detachPin = pinId => db.ref(dbRef.PINS + pinId).off();

export const doCreatePin = pinInfo => {
  let newPinId = db.ref(dbRef.PINS).push({
    uid: pinInfo.authUser.uid,
    title: pinInfo.title,
    latitude: pinInfo.latitude,
    longitude: pinInfo.longitude,
    radius: pinInfo.radius
  }).key;
  db.ref(dbRef.USER_PINS + pinInfo.authUser.uid + "/" + newPinId).set({ _: 0 });
};

export const onAllPins = (userId, f) => {
  let allUserPins = db.ref(dbRef.PINS);
  allUserPins
    .orderByChild("uid")
    .equalTo(userId)
    .on("value", f);
};

export const detachAllPins = () => {
  db.ref(dbRef.PINS).off();
};

export const doDeletePin = (authUser, pinKey) => {
  db
    .ref(dbRef.PINS)
    .child(pinKey)
    .remove();
  db
    .ref(dbRef.USER_PINS + authUser.uid)
    .child(pinKey)
    .remove();
};

//GeoFire APIs

export const onNearbyPosts = (
  latitude,
  longitude,
  radius,
  keyEntered,
  keyLeft
) => {
  let geoKey = db.ref(dbRef.POST_LOCATIONS);
  let geoFire = new GeoFire(geoKey);

  let geoQuery = geoFire.query({
    center: [latitude, longitude],
    radius: radius
  });

  let keyEnteredQuery = geoQuery.on("key_entered", keyEntered);
  let keyExitedQuery = geoQuery.on("key_exited", keyLeft);

  return {
    detach: () => {
      keyEnteredQuery.cancel();
      keyExitedQuery.cancel();
    }
  };
};

const createPostLocation = (key, latitude, longitude) => {
  let geoKey = db.ref(dbRef.POST_LOCATIONS);
  let geoFire = new GeoFire(geoKey);
  geoFire.set(key, [latitude, longitude]);
};

// Helpers
const onOwn = (authUser, keyEntered, keyLeft, dbLocation) => {
  let ref = db.ref(dbLocation + authUser.uid);

  ref.on("child_added", snapshot => keyEntered(snapshot.key));
  ref.on("child_removed", snapshot => keyLeft(snapshot.key));

  return {
    detach: () => {
      ref.off();
    }
  };
};
