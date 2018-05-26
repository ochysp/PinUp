// @flow

import type { LatLng } from 'leaflet';
import * as leafletValues from '../constants/leafletValues';
import type { LocationType } from './Types';

export const convertToLeafletRadius = (radius: number): number => (radius * 1000);

export const convertToValidLocation = (location: LatLng): LatLng => {
  const correctedLocation = Object.assign({}, location);
  while (correctedLocation.lng > leafletValues.UPPER_MAP_BOUND
  || correctedLocation.lng < leafletValues.LOWER_MAP_BOUND_LNG) {
    if (correctedLocation.lng > leafletValues.UPPER_MAP_BOUND) {
      correctedLocation.lng -= leafletValues.MOVE_TO_GET_NEXT_MAP;
    } else if (correctedLocation.lng < leafletValues.LOWER_MAP_BOUND_LNG) {
      correctedLocation.lng += leafletValues.MOVE_TO_GET_NEXT_MAP;
    }
  }
  return correctedLocation;
};

export const convertToLeafletLocation = (location: LocationType): LatLng => (
  { lat: location.latitude, lng: location.longitude }
);

export const convertToLocationType = (location: LatLng): LocationType => {
  if (location.lat && location.lng && typeof location.lat === 'number' && typeof location.lng === 'number') {
    const validLatLng = convertToValidLocation(location);
    return { latitude: validLatLng.lat, longitude: validLatLng.lng };
  }
  // eslint-disable-next-line no-throw-literal
  throw 'unknown leaflet location type';
};
