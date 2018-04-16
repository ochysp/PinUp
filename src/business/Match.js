// @flow

import * as GeoFire from 'geofire';
import * as dbRef from '../constants/dbRef';
import { db } from '../datalayer/firebase/firebase';
import type { AreaType, GeoQuerryCallback, ConnectionType } from '../Types';

const listenForPostsIDsInArea = (
  area: AreaType,
  keyEntered: GeoQuerryCallback,
  keyLeft: GeoQuerryCallback,
): ConnectionType => {
  const geoKey = db.ref(dbRef.POST_LOCATIONS);
  const geoFire = new GeoFire(geoKey);

  const geoQuery = geoFire.query({
    center: [area.location.latitude, area.location.longitude],
    radius: area.radius,
  });

  const keyEnteredQuery = geoQuery.on('key_entered', keyEntered);
  const keyExitedQuery = geoQuery.on('key_exited', keyLeft);

  return {
    detach: () => {
      keyEnteredQuery.cancel();
      keyExitedQuery.cancel();
    },
  };
};

export default listenForPostsIDsInArea;
