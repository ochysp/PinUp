import {db} from './firebase';
import * as authentication from './authentication';
import * as GeoFire from 'geofire';
import * as dbRef from '../constants/dbRef'


// User API

export const doCreateUser = (userId, name, email, imageUrl) =>
    db.ref(dbRef.USER_INFO + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });


// Post APIs ...

export const onOwnPosts = (keyEntered, keyLeft) => {
    return onOwn(keyEntered, keyLeft, dbRef.USER_POSTS);
};

export const onPost = (postId, f) =>
    db.ref(dbRef.POSTS + authentication.getUid() + '/' + postId).on('value', f);

export const detachPost = (postId) =>
    db.ref(dbRef.POSTS + authentication.getUid() + '/' + postId).off();


// Pin APIs ...

export const onOwnPins = (keyEntered, keyLeft) => {
    return onOwn(keyEntered, keyLeft, dbRef.USER_PINS);
};

export const onPin = (pinId, f) =>
    db.ref(dbRef.PINS + authentication.getUid() + '/' + pinId).on('value', f);

export const detachPin = (pinId) =>
    db.ref(dbRef.PINS + authentication.getUid() + '/' + pinId).off();


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


//Test API

export const geoFireTest = (keyEntered, keyLeft) => {
    // Generate Firebase location
    let geoKey = db.ref('geoFire/pin_locations');

    // Create a new GeoFire instance at the posts location
    let geoFire = new GeoFire(geoKey);

    //create demo post
    let postKey;
    postKey = geoFire.set("geotestpostA", [47.223952, 8.8159]);
    postKey = geoFire.set("geotestpostB", [47.217009, 8.829109]);
    postKey = geoFire.set("geotestpostC", [47.217009, 8.829109]);
    postKey = geoFire.set("geotestpostD", [47.219952, 8.810122]);
    postKey = geoFire.set("geotestpostE", [47.224452, 8.801398]);

    // Create a GeoQuery centered at geotestpostA
    var geoQuery = geoFire.query({
        center: [47.223952, 8.8159],
        radius: 1
    });

    geoQuery.on("key_entered", keyEntered);
    geoQuery.on("key_exited", keyLeft);
};


// Helpers

const onOwn = (keyEntered, keyLeft, dbLocation) => {
    let ref = db.ref(dbLocation + authentication.getUid());

    ref.on('child_added', (snapshot, sibling) => keyEntered(snapshot.key()));
    ref.on('child_removed', (snapshot, sibling) => keyLeft(snapshot.key()));

    return ({
            detach: () => {
                ref.off();
            }
        }
    )
};
