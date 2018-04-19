// @flow
/* eslint-disable react/jsx-no-bind,react/sort-comp */

import React from 'react';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import type { LatLng } from 'react-leaflet/es/types';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import { detachAllPinListeners, listenForAllPinsOfUser, doDeletePin } from '../business/Pin';
import { detachAllPostListeners, listenForAllPosts, doDeletePost } from '../business/Post';
import CreatePinForm from './Pin/CreatePinForm';
import CreatePostForm from './Post/CreatePostForm';
import * as leafletValues from '../constants/leafletValues';
import type { AuthUserType, LocationType, PinInfoType, PostInfoWithLocationType, SnapshotType } from '../Types';

const convertToLeafletLocation = (location: LocationType): LatLng => (
  { lat: location.latitude, lng: location.longitude }
);

const convertToLocationType = (location: LatLng): LocationType => {
  if (location.lat && location.lng && typeof location.lat === 'number' && typeof location.lng === 'number') {
    return { latitude: location.lat, longitude: location.lng };
  }
  // eslint-disable-next-line no-throw-literal
  throw 'unknown leaflet location type';
};

const convertFromGeofireToLeafletLocation = (location: Array): LatLng => (
  { lat: location[0], lng: location[1] }
);

const convertToLeafletRadius = (radius: number): number => (radius * 1000);

type State = {
  center: LatLng,
  zoom: number,

  marker: LatLng,
  markerIsSet: boolean,
  isPin: boolean,
  isPost: boolean,

  pins: Array<PinInfoType>,

  drawer: boolean,
  posts: Array<PostInfoWithLocationType>,
};

type Props = {
  authUser: AuthUserType
};

export default class Home extends React.Component<Props, State> {
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

      drawer: false,
    };
  }

  componentDidMount() {
    listenForAllPinsOfUser(this.props.authUser.uid, (snapshot: SnapshotType) => {
      console.log(snapshot.val());

      if (snapshot.val() === null) {
        this.setState({ pins: [] });
      } else {
        this.setState({
          pins: Object.entries(snapshot.val()).map(([key, value]: [string, any]) => ({
            pinId: key,
            ...value,
          })),
        });
      }
    });

    listenForAllPosts(this.props.authUser.uid, (snapshot: SnapshotType) => {
      console.log(snapshot.val());
      if (snapshot.val() === null) {
        this.setState({ posts: [] });
      } else {
        this.setState({
          posts: Object.entries(snapshot.val()).map(([key, value]: [string, Array]) => ({
            postId: key,
            ...value,
          })),
        });
      }
    });
  }

  setMarker = (e: any) => {
    const position = e.latlng;
    this.setState({
      markerIsSet: true,
      marker: position,
      drawer: true,
    });
  };

  handleSetPin = () => {
    this.setState({ isPin: true, isPost: false });
  };

  handleSetPost = () => {
    this.setState({ isPost: true, isPin: false });
  };

  handleDeletePin = (pin: PinInfoType) => {
    if (pin.pinId) {
      doDeletePin(this.props.authUser, pin.pinId);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw 'pin can not be deleted because no pinId was provided';
    }
  };

  handleDeletePost(post: PostInfoWithLocationType) {
    doDeletePost(this.props.authUser, post.postId);
  }

  render() {
    const {
      marker, center, zoom, markerIsSet, isPin, isPost,
    } = this.state;

    const pinForm = isPin ? (
      <CreatePinForm authUser={this.props.authUser} position={convertToLocationType(marker)} />
    ) : null;
    const postForm = isPost ? (
      <CreatePostForm authUser={this.props.authUser} position={convertToLocationType(marker)} />
    ) : null;

    const currentMarker = markerIsSet ? (
      <Marker position={marker} ref="marker" />
    ) : null;

    return (
      <div>
        <Drawer
          anchor="bottom"
          open={this.state.drawer}
          onClose={() => this.setState({ drawer: false })}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.setState({ drawer: false })}
            onKeyDown={() => this.setState({ drawer: false })}
          >
            <Button onClick={this.handleSetPin}>Create Pin</Button>
          </div>
        </Drawer>
        <Map center={center} zoom={zoom} onClick={this.setMarker}>
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

          {this.state.pins.map((pin: PinInfoType, index) => (
            <Marker key={pin.pinId} position={convertToLeafletLocation(pin.area.location)}>
              <Popup>
                <span>
                  My Pin #{index}
                  <br />
                  <Button onClick={this.handleDeletePin(pin)}>
                    Delete Pin
                  </Button>
                </span>
              </Popup>
              <Circle
                center={convertToLeafletLocation(pin.area.location)}
                radius={convertToLeafletRadius(pin.area.radius)}
              />
            </Marker>
          ))}

          {this.state.posts.map((post: PostInfoWithLocationType, index) => (
            <Marker key={post.postId} position={convertFromGeofireToLeafletLocation(post.location)}>
              <Popup>
                <span>
                  My Post #{index}
                  <br />
                  <button onClick={this.handleDeletePost.bind(this, post)}>
                    Delete Post
                  </button>
                </span>
              </Popup>
            </Marker>
          ))}
          {currentMarker}

        </Map>
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
