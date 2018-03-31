import {db} from './firebase';

// User API

export const doCreateUser = (userId, name, email, imageUrl) =>
    db.ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });

export const onceGetUsers = () =>
    db.ref('users').once('value');

// Other Entity APIs ...


export const getPosts = (f) =>
    db.ref('posts').on('value', f);

export const detachPosts = () =>
    db.ref('posts').off();