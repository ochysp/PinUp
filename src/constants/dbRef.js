// @flow

const USERDATA = 'userData/';
export const USER_INFO = `${USERDATA}userInfo/`;

export const PINS = 'pins/';
export const POSTS = 'posts/';

export const GEOFIRE = 'GeoFire/';
export const postLocations = (categoryId: string) => `${GEOFIRE}${categoryId}/`;

