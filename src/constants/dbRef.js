// @flow
import { Testing } from '../data/firebase/firebaseconfig';

export const ROOT = (Testing.testRun ? `testrun-${Math.random().toString(36).substr(2, 16)}/` : '');

const USERDATA = `${ROOT}userData/`;
export const USER_INFO = `${USERDATA}userInfo/`;

export const PINS = `${ROOT}pins/`;
export const POSTS = `${ROOT}posts/`;

export const GEOFIRE = `${ROOT}GeoFire/`;
export const postLocations = (categoryId: string) => `${GEOFIRE}${categoryId}/`;

