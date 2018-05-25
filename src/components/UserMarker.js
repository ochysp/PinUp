// @flow
/* eslint-disable react/jsx-no-bind,react/sort-comp,react/no-string-refs */

import React from 'react';
import { Circle, Marker } from 'react-leaflet';
import { newIcon, pinIcon, postIcon } from '../img/LeafletIcons';
import { convertToLeafletLocation, convertToLeafletRadius } from '../business/Map';
import type { MarkerType } from '../business/Marker';
import { PIN, POST } from '../business/Marker';
import type { LocationType } from '../business/Types';

type Props = {
  location: LocationType,
  isSet: boolean,
  type: MarkerType,
  radius: number,
};

class UserMarker extends React.Component<Props> {
  render() {
    const {
      location, isSet, type, radius,
    } = this.props;

    let userMarker = null;
    if (isSet) {
      let userMarkerIcon;
      switch (type) {
        case PIN:
          userMarkerIcon = pinIcon;
          break;
        case POST:
          userMarkerIcon = postIcon;
          break;
        default:
          userMarkerIcon = newIcon;
      }

      userMarker = (
        <Marker
          position={convertToLeafletLocation(location)}
          ref="marker"
          color="white"
          icon={userMarkerIcon}
        >
          {type === PIN && <Circle
            center={convertToLeafletLocation(location)}
            radius={convertToLeafletRadius(radius)}
            color="white"
          />}
        </Marker>
      );
    }

    return (userMarker);
  }
}

export default UserMarker;
