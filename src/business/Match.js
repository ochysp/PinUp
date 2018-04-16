import * as dbRef from '../constants/dbRef'
import {db} from '../data/firebase/firebase'
import * as GeoFire from 'geofire'

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