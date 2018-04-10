import {db} from '../datalayer/firebase/firebase'

export const onOwn = (authUser, keyEntered, keyLeft, dbLocation) => {
  let ref = db.ref(dbLocation + authUser.uid);

  ref.on("child_added", snapshot => keyEntered(snapshot.key));
  ref.on("child_removed", snapshot => keyLeft(snapshot.key));

  return {
    detach: () => {
      ref.off();
    }
  };
};
