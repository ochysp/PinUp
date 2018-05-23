// @flow
/* eslint-disable react/jsx-no-bind,react/sort-comp,react/no-string-refs */

import React from 'react';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import type { LatLng } from 'react-leaflet/es/types';
import { withStyles, Button } from '@material-ui/core';
import {
  detachAllPinListeners,
  deletePin,
  listenForAllPinsWithMatchesOfUser,
} from '../business/Pin';
import { detachAllPostListeners, listenForAllPostsOfUser, deletePost } from '../business/Post';
import CreatePinForm from './Pin/CreatePinForm';
import CreatePostForm from './Post/CreatePostForm';
import * as leafletValues from '../constants/leafletValues';
import type { AuthUserType, LocationType, PinType, PostType } from '../business/Types';
import SelectionDrawer from './FormComponents/SelectionDialog';
import { CATEGORIES } from '../constants/categories';
import { numberedPinIcon, pinIcon, postIcon } from '../img/LeafletIcons';
import { styles } from '../style/styles';

const convertToLeafletLocation = (location: LocationType): LatLng => (
  { lat: location.latitude, lng: location.longitude }
);

const convertToValidLocation = (location: LatLng): LocationType => {
  const newLocation = { lat: location.lat, lng: location.lng };
  if (newLocation.lng > 180) {
    newLocation.lng -= 360;
    return convertToValidLocation(newLocation);
  } else if (newLocation.lng < -180) {
    newLocation.lng += 360;
    return convertToValidLocation(newLocation);
  }
  return location;
};

const convertToLocationType = (location: LatLng): LocationType => {
  if (location.lat && location.lng && typeof location.lat === 'number' && typeof location.lng === 'number') {
    const validLocation = convertToValidLocation(location);
    return { latitude: validLocation.lat, longitude: validLocation.lng };
  }
  // eslint-disable-next-line no-throw-literal
  throw 'unknown leaflet location type';
};

const convertToLeafletRadius = (radius: number): number => (radius * 1000);

type State = {
  center: LatLng,
  zoom: number,

  marker: LatLng,
  markerIsSet: boolean,
  isPin: boolean,
  isPost: boolean,

  pins: Array<PinType>,
  posts: Array<PostType>,

  editablePost: PostType,
  editablePin: PinType,

  dialogIsActive: boolean

};

type Props = {
  authUser: AuthUserType,
  classes: any,
};

class Home extends React.Component<Props, State> {
  constructor() {
    super();

    const position = { lat: leafletValues.LAT, lng: leafletValues.LNG };

    this.state = {
      center: position,
      zoom: leafletValues.ZOOM,

      marker: position,
      markerIsSet: false,
      isPin: false,
      isPost: false,

      pins: [],
      posts: [],

      editablePost: null,
      editablePin: null,

      dialogIsActive: false,
    };
  }

  componentDidMount() {
    listenForAllPinsWithMatchesOfUser(this.props.authUser.uid, (newPins: PinType[]) => {
      this.setState({ pins: newPins });
    });

    listenForAllPostsOfUser(this.props.authUser.uid, (newPosts: PostType[]) => {
      this.setState({ posts: newPosts });
    });
  }

  setMarker = (e: any) => {
    const position = e.latlng;
    this.setState({
      markerIsSet: true,
      marker: position,
      dialogIsActive: true,
      isPin: false,
      isPost: false,
      editablePost: null,
      editablePin: null,
    });
  };

  handleSetPin = () => {
    this.setState({ isPin: true, isPost: false, dialogIsActive: false });
  };
  handleSetPost = () => {
    this.setState({ isPost: true, isPin: false, dialogIsActive: false });
  };
  unsetMarker = () => {
    this.setState({ markerIsSet: false });
  };

  handleDeletePin = (pin: PinType) => () => {
    if (pin.pinId) {
      deletePin(this.props.authUser, pin.pinId);
      this.unsetMarker();
    } else {
      // eslint-disable-next-line no-throw-literal
      throw 'pin can not be deleted because no pinId was provided';
    }
  };

  handleEditPin = (pin: PinType) => () => {
    this.handleSetPin();
    this.setState({ editablePin: pin });
  };

  handleCloseDialogs = () => this.setState({
    isPin: false,
    isPost: false,
    dialogIsActive: false,
    editablePost: null,
    editablePin: null,
  });

  handleDeletePost = (post: PostType) => () => {
    if (post.postId) {
      deletePost(this.props.authUser, post);
      this.unsetMarker();
    } else {
      // eslint-disable-next-line no-throw-literal
      throw 'post can not be deleted because no postId was provided';
    }
  };

  handleEditPost = (post: PostType) => () => {
    this.handleSetPost();
    this.setState({ editablePost: post });
  };

  render() {
    const {
      marker, center, zoom, markerIsSet, isPin, isPost,
    } = this.state;

    const pinForm = isPin ? (
      <CreatePinForm
        authUser={this.props.authUser}
        position={convertToLocationType(marker)}
        editablePin={this.state.editablePin}
        onDone={this.handleCloseDialogs}
      />
    ) : null;

    const postForm = isPost ? (
      <CreatePostForm
        authUser={this.props.authUser}
        position={convertToLocationType(marker)}
        editablePost={this.state.editablePost}
        onDone={this.handleCloseDialogs}
      />
    ) : null;

    const currentMarker = markerIsSet ? (
      <Marker
        position={marker}
        ref="marker"
        color="white"
      />
    ) : null;

    const selectionDrawer = (
      <SelectionDrawer
        handleSetPin={this.handleSetPin}
        handleSetPost={this.handleSetPost}
        dialogIsActive={this.state.dialogIsActive}
        onClose={() => (this.setState({
          markerIsSet: false,
          dialogIsActive: false,
        }))}
      />
    );

    return (
      <div className={this.props.classes.mapRoot}>
        <Map
          center={center}
          zoom={zoom}
          minZoom={2}
          maxBounds={[[-90, -180], [90, 180]]}
          onClick={this.setMarker}
          className={this.props.classes.map}
        >
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

          {this.state.pins.map((pin: PinType) => (
            <Marker
              key={pin.pinId}
              position={convertToLeafletLocation(pin.area.location)}
              icon={pin.matches ? numberedPinIcon(pin.matches.length) : pinIcon}
            >
              <Popup>
                <span>
                  {pin.title}
                  <br />
                  {Object.keys(pin.categories).map(catId => (CATEGORIES[catId])).join(', ')}
                  <br />
                  <Button onClick={this.handleEditPin(pin)}>
                    Edit Pin
                  </Button>
                  <Button onClick={this.handleDeletePin(pin)}>
                    Delete Pin
                  </Button>
                </span>
              </Popup>
              <Circle
                center={convertToLeafletLocation(pin.area.location)}
                radius={convertToLeafletRadius(pin.area.radius)}
                color="white"
              />
            </Marker>
          ))}

          {this.state.posts.map((post: PostType) => (
            <Marker
              key={post.postId}
              position={convertToLeafletLocation(post.location)}
              icon={postIcon}
            >
              <Popup>
                <span>
                  {post.title}
                  <br />
                  {CATEGORIES[post.category]}
                  <br />
                  <Button onClick={this.handleEditPost(post)}>
                    Edit Post
                  </Button>
                  <Button onClick={this.handleDeletePost(post)}>
                    Delete Post
                  </Button>
                </span>
              </Popup>
            </Marker>
          ))}
          {currentMarker}
        </Map>
        {selectionDrawer}
        {pinForm}
        {postForm}
      </div>
    );
  }

  componentWillUnmount() {
    detachAllPinListeners();
    detachAllPostListeners();
  }
}

export default withStyles(styles)(Home);
