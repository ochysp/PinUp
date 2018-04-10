import * as dbRef from '../constants/dbRef'
import { db } from '../datalayer/firebase/firebase'

export const doCreateUser = (userId, name, email, imageUrl) =>
  db.ref(dbRef.USER_INFO + userId).set({
    username: name,
    email: email,
    profile_picture: imageUrl
  });