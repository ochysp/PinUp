// @flow

import * as GeoFire from 'geofire';
import * as dbRef from '../constants/dbRef';
import { db } from '../data/firebase/firebase';
import type {
  AreaType,
  GeoQuerryCallback,
  ConnectionType,
  CategoriesType,
  CategoryType,
} from '../Types';

const listenForPostsIDsInArea = (
  area: AreaType,
  categories: CategoriesType,
  keyEntered: GeoQuerryCallback,
  keyLeft: GeoQuerryCallback,
): ConnectionType => {
  const handles = [];
  Object.keys(categories).forEach((category: CategoryType, i) => {
    const geoKey = db.ref(dbRef.postLocations(category));
    const geoFire = new GeoFire(geoKey);

    const geoQuery = geoFire.query({
      center: [area.location.latitude, area.location.longitude],
      radius: area.radius,
    });

    const keyEnteredQuery = geoQuery.on('key_entered', keyEntered);
    const keyExitedQuery = geoQuery.on('key_exited', keyLeft);

    handles[i] = {
      detach: () => {
        keyEnteredQuery.cancel();
        keyExitedQuery.cancel();
      },
    };
  });
  return handles;
};

export default listenForPostsIDsInArea;
