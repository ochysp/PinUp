// @flow
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import type { LatLng } from 'react-leaflet/es/types';
import { detachAllPinListeners, listenForAllPinsOfUser, doDeletePin } from '../business/Pin';
import { detachAllPostListeners, listenForAllPosts, doDeletePost } from '../business/Post';
import CreatePinForm from './Pin/CreatePinForm';
import CreatePostForm from './Post/CreatePostForm';
import * as leafletValues from '../constants/leafletValues';
import type { AuthUserType, LocationType, PinInfoType, PostInfoWithLocationType, SnapshotType } from '../Types';

const convertToLeafletLocation = (location: LocationType): LatLng => (
  { lat: location.latitude, lng: location.longitude }
);

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
    });
  };

  handleSetPin = () => {
    this.setState({ isPin: true, isPost: false });
  };

  handleSetPost = () => {
    this.setState({ isPost: true, isPin: false });
  };

  handleDeletePin = (pin: PinInfoType) => {
    doDeletePin(this.props.authUser, pin.pinId);
  };

  handleDeletePost(post: PostInfoWithLocationType) {
    doDeletePost(this.props.authUser, post.postId);
  }

  render() {
    const {
      marker, center, zoom, markerIsSet, isPin, isPost,
    } = this.state;

    const pinForm = isPin ? (
      <CreatePinForm authUser={this.props.authUser} position={marker} />
    ) : null;
    const postForm = isPost ? (
      <CreatePostForm authUser={this.props.authUser} position={marker} />
    ) : null;

    const currentMarker = markerIsSet ? (
      <Marker position={marker}>
        <Popup>
          <span>
            Create a<br />
            <button onClick={this.handleSetPin}>
              Pin
            </button>
            <br />
            <button onClick={this.handleSetPost}>
              Post
            </button>
          </span>
        </Popup>
      </Marker>
    ) : null;

    return (
      <div>
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
                  <button onClick={this.handleDeletePin.bind(this, pin)}>
                    Delete Pin
                  </button>
                </span>
              </Popup>
              <Circle
                center={convertToLeafletLocation(pin.area.location)}
                radius={convertToLeafletRadius(pin.area.radius)}
              />
            </Marker>
          ))}

          {this.state.posts.map((post: PostInfoWithLocationType, index) => (
            <Marker key={post.postId} position={convertFromGeofireToLeafletLocation(post.l)}>
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
