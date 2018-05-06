// @flow

import * as GeoFire from 'geofire';
import * as dbRef from '../constants/dbRef';
import { db } from '../data/firebase/firebase';
import type {
  AreaType,
  GeoQuerryCallback,
  ConnectionType,
  CategoriesType,
  NotificationCallback,
} from './Types';

//  Listens for Posts in a specific area
const Match = (
  area: AreaType,
  categories: CategoriesType,
  keyEntered: GeoQuerryCallback,
  keyLeft: GeoQuerryCallback,
  ready: NotificationCallback,
): ConnectionType[] => {
  const handles = [];
  Object.keys(categories).forEach((categoryId: string, i) => {
    const geoKey = db.ref(dbRef.postLocations(categoryId));
    const geoFire = new GeoFire(geoKey);

    const geoQuery = geoFire.query({
      center: [area.location.latitude, area.location.longitude],
      radius: area.radius,
    });

    const keyEnteredQuery = geoQuery.on('key_entered', keyEntered);
    const keyExitedQuery = geoQuery.on('key_exited', keyLeft);
    const readyQuerry = geoQuery.on('ready', ready);

    handles[i] = {
      detach: () => {
        keyEnteredQuery.cancel();
        keyExitedQuery.cancel();
        readyQuerry.cancel();
      },
    };
  });
  return handles;
};

export default Match;
