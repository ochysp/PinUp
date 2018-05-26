// @flow
/* eslint-disable react/jsx-no-bind,react/sort-comp,react/no-string-refs */

import React from 'react';
import { Circle, Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Button, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';
import * as leafletValues from '../constants/leafletValues';
import type { LocationType, PinType, PostType } from '../business/Types';
import { CATEGORIES } from '../constants/categories';
import { numberedPinIcon, pinIcon, postIcon } from '../img/LeafletIcons';
import { homeStyles } from '../style/styles';
import * as routes from '../constants/routes';
import UserMarker from './UserMarker';
import {
  convertToLeafletLocation,
  convertToLeafletRadius,
  convertToLocationType,
} from '../business/Map';
import type { MarkerType } from '../business/Marker';
import { PIN, POST, UNDEFINED } from '../business/Marker';

type State = {
  center: LocationType,
}

type Props = {
// eslint-disable-next-line react/no-unused-prop-types
  center: ?LocationType,

  pins: Array<PinType>,
  posts: Array<PostType>,

  showMyEntries: boolean,

  currentMarkerIsSet: boolean,
  currentMarkerLocation: ?LocationType,
  currentMarkerRadius: number,
  currentMarkerType: MarkerType,

  onNewMarker: (LocationType) => void,
  onMarkerLocationChange: (LocationType) => void,
  onEditPost: (PostType) => void,
  onEditPin: (PinType) => void,
  onDeletePost: (PostType) => void,
  onDeletePin: (PinType) => void,

  classes: any,
  history: any,
};

class PinUpMap extends React.Component<Props, State> {
  handleOnMapClick = (e: any) => {
    if (this.props.currentMarkerType === PIN || this.props.currentMarkerType === POST) {
      this.updateMarkerPosition(e);
      return;
    }
    if (!this.props.currentMarkerIsSet) {
      this.setMarker(e);
    }
  };
  updateMarkerPosition = (e: any) => {
    const position = e.latlng;
    this.props.onMarkerLocationChange(convertToLocationType(position));
  };
  setMarker = (e: any) => {
    const position = e.latlng;
    this.props.onNewMarker(convertToLocationType(position));
  };
  goToMatches = (pin: PinType) => () => {
    this.props.history.push(`${routes.PINS}?pinId=${pin.pinId}`);
  };
  goToPost = (post: PostType) => () => {
    this.props.history.push(`${routes.POSTS}?postId=${post.postId}`);
  };

  constructor(props: Props) {
    super(props);
    this.state = { center: convertToLocationType(leafletValues.DEFAULT_POSITION) };
  }

  static getDerivedStateFromProps(nextProps: Props) {
    if (nextProps.center) {
      return { center: nextProps.center };
    }
    return null;
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.refs.map.leafletElement.invalidateSize(false);
    }, 300);
  }

  render() {
    const {
      pins, posts, classes, currentMarkerIsSet, currentMarkerLocation, showMyEntries,
      currentMarkerRadius, currentMarkerType, onEditPin, onEditPost, onDeletePin, onDeletePost,
    } = this.props;

    return (
      <Map
        ref="map"
        center={convertToLeafletLocation(this.state.center)}
        zoom={leafletValues.ZOOM}
        minZoom={leafletValues.VIEW_MINIMUM_ZOOM_RESTRICTION}
        maxBounds={[[leafletValues.LOWER_MAP_BOUND_LAT, leafletValues.LOWER_MAP_BOUND_LNG],
          [leafletValues.UPPER_MAP_BOUND_LAT, leafletValues.UPPER_MAP_BOUND]]}
        onClick={this.handleOnMapClick}
        className={classes.map}
      >
        <TileLayer
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />

        {showMyEntries && pins.map((pin: PinType) => (
          <Marker
            key={pin.pinId}
            position={convertToLeafletLocation(pin.area.location)}
            icon={pin.matches ? numberedPinIcon(pin.matches.length) : pinIcon}
          >
            {(currentMarkerType === UNDEFINED) &&
            <Popup>
              <div className={classes.popup}>
                <div className={classes.popupDiv}>

                  <Typography
                    variant="title"
                    className={classes.spaceAbove}
                  >{pin.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    className={`${classes.spaceUnder} ${classes.spaceAbove}`}
                  > {Object.keys(pin.categories).map(catId => (CATEGORIES[catId])).join(', ')}
                  </Typography>

                  <Divider />

                  <div className={`${classes.flexContainer} ${classes.spaceAbove}`}>
                    <Button className={classes.flexChild} onClick={() => onEditPin(pin)}>
                      Edit
                    </Button>
                    <Button className={classes.flexChild} onClick={() => onDeletePin(pin)}>
                      Delete
                    </Button>
                  </div>

                  <Button
                    variant="raised"
                    id="show-matches-button"
                    className={`${classes.matchesButton} ${classes.spaceAbove}`}
                    onClick={this.goToMatches(pin)}
                  >
                    Show Matches
                  </Button>

                </div>
              </div>
            </Popup>
            }
            <Circle
              center={convertToLeafletLocation(pin.area.location)}
              radius={convertToLeafletRadius(pin.area.radius)}
              color="white"
            />
          </Marker>
        ))}

        {showMyEntries && posts.map((post: PostType) => (
          <Marker
            key={post.postId}
            position={convertToLeafletLocation(post.location)}
            icon={postIcon}
          >
            {(currentMarkerType === UNDEFINED) &&
            <Popup>
              <div className={classes.popup}>
                <div className={classes.popupDiv}>

                  <Typography
                    variant="title"
                    className={classes.spaceAbove}
                  >{post.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    className={`${classes.spaceUnder} ${classes.spaceAbove}`}
                  >{CATEGORIES[post.category]}
                  </Typography>

                  <Divider />

                  <div className={`${classes.flexContainer} ${classes.spaceAbove}`}>
                    <Button className={classes.flexChild} onClick={() => onEditPost(post)}>
                      Edit
                    </Button>
                    <Button className={classes.flexChild} onClick={() => onDeletePost(post)}>
                      Delete
                    </Button>
                  </div>

                  <Button
                    variant="raised"
                    id="show-post-button"
                    className={`${classes.PostButton} ${classes.spaceAbove}`}
                    onClick={this.goToPost(post)}
                  >
                    Show Post
                  </Button>

                </div>
              </div>
            </Popup>
            }
          </Marker>
        ))}
        <UserMarker
          location={currentMarkerLocation}
          isSet={currentMarkerIsSet}
          type={currentMarkerType}
          radius={currentMarkerRadius || 0}
        />
      </Map>
    );
  }
}

export default withRouter(withStyles(homeStyles)(PinUpMap));
