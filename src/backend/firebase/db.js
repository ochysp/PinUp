import {db} from './firebase';
import * as GeoFire from 'geofire';
import * as dbRef from '../../constants/dbRef'


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
    db.ref(dbRef.POSTS + postId).on('value', f);

export const detachPost = (postId) =>
    db.ref(dbRef.POSTS + postId).off();

export const doCreatePost = (postInfo) => {
    let newPostId = db.ref(dbRef.POSTS).push({
        'title': postInfo.title
    }).key;
    db.ref(dbRef.USER_POSTS + postInfo.authUser.uid + '/' + newPostId).set({'_': 0});
    gcreatePostLocation(newPostId, postInfo.latitude, postInfo.longitude);
};
// Pin APIs ...

export const onOwnPins = (authUser, keyEntered, keyLeft) => {
    return onOwn(authUser, keyEntered, keyLeft, dbRef.USER_PINS);
};

export const onPin = (pinId, f) =>
    db.ref(dbRef.PINS + pinId).on('value', f);

export const detachPin = (pinId) =>
    db.ref(dbRef.PINS + pinId).off();

export const doCreatePin = (pinInfo) => {
    let newPinId = db.ref(dbRef.PINS).push({
        'title': pinInfo.title,
        'latitude': pinInfo.latitude,
        'longitude': pinInfo.longitude,
        'radius': pinInfo.radius
    }).key;
    db.ref(dbRef.USER_PINS + pinInfo.authUser.uid + '/' + newPinId).set({'_': 0});
};

//GeoFire APIs

export const onNearbyPosts = (latitude, longitude, radius, keyEntered, keyLeft) => {
    // Generate Firebase location
    let geoKey = db.ref(dbRef.POST_LOCATIONS);

    // Create a new GeoFire instance at the posts location
    let geoFire = new GeoFire(geoKey);

    // Create a GeoQuery centered at ...
    let geoQuery = geoFire.query({
        center: [latitude, longitude],
        radius: radius
    });

    //attach query
    let keyEnteredQuery = geoQuery.on("key_entered", keyEntered);
    let keyExitedQuery = geoQuery.on("key_exited", keyLeft);

    //return callback to detach query
    return ({
            detach: () => {
                keyEnteredQuery.cancel();
                keyExitedQuery.cancel();
            }
        }
    )
};

const gcreatePostLocation = (key, latitude, longitude) => {
    let geoKey = db.ref(dbRef.POST_LOCATIONS);
    let geoFire = new GeoFire(geoKey);
    geoFire.set(key, [latitude, longitude]);
};


// Helpers

const onOwn = (authUser, keyEntered, keyLeft, dbLocation) => {
    let ref = db.ref(dbLocation + authUser.uid);

    ref.on('child_added', (snapshot, sibling) => keyEntered(snapshot.key));
    ref.on('child_removed', (snapshot, sibling) => keyLeft(snapshot.key));

    return ({
            detach: () => {
                ref.off();
            }
        }
    )
};
