// @flow

import React from 'react';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import type { LatLng } from 'react-leaflet/es/types';
import { detachAllPinListeners, listenForAllPinsOfUser, doDeletePin } from '../business/Pin';
import CreatePinForm from './Pin/CreatePinForm';
import CreatePostForm from './Post/CreatePostForm';
import * as leafletValues from '../constants/leafletValues';
import type { AuthUserType, LocationType, PinInfoType, SnapshotType } from '../Types';

const convertToLeafletLocation = (location: LocationType): LatLng => (
  { lat: location.latitude, lng: location.longitude });

const convertToLeafletRadius = (radius: number): number => (radius * 1000);

type State = {
  center: LatLng,
  zoom: number,

  marker: LatLng,
  markerIsSet: boolean,
  isPin: boolean,
  isPost: boolean,

  pins: Array<PinInfoType>,
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
    };
  }

  componentDidMount() {
    listenForAllPinsOfUser(this.props.authUser.uid, (snapshot: SnapshotType) => {
      console.log('listenForAllPinsOfUser Callbacked');
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

    onAllPosts(this.props.authUser.uid, snapshot => {
      if (snapshot.val() === null) {
        this.setState({ posts: [] });
      } else {
        this.setState({
          posts: Object.entries(snapshot.val()).map(
            ([key, value]: [string, any]) => ({
              key,
              ...value,
              position: { lat: value.l[0], lng: value.l[1] } //.l is an array with GeoFire-Locations
            })
          )
        });
      }
    });

  }

  componentWillUnmount() {
    detachAllPinListeners();
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

  handleDeletePin = (pin: any) => {
    doDeletePin(this.props.authUser, pin.key);
  }

  handleDeletePost(post) {
    doDeletePost(this.props.authUser, post.key);
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
      <Marker position={marker} ref="marker">
        <Popup>
          <span>
            Create a<br />
            <a ref="" onClick={this.handleSetPin}>
              Pin
            </a>
            <br />
            <a ref="" onClick={this.handleSetPost}>
              Post
            </a>
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
            <Marker key={pin.pinId} position={convertToLeafletLocation(pin.area.location)} ref="pin">
              <Popup>
                <span>
                  My Pin #{index}
                  <br />
                  <a ref="" onClick={this.handleDeletePin.bind(this, pin)}>
                    Delete Pin
                  </a>
                </span>
              </Popup>
              <Circle
                center={convertToLeafletLocation(pin.area.location)}
                radius={convertToLeafletRadius(pin.area.radius)}
                ref="circle"
              />
            </Marker>
          ))}

          {this.state.posts.map((post, index) => (
            <Marker key={post.key} position={post.position} ref="post">
              <Popup>
                <span>
                  My Post #{index}
                  <br />
                  <a ref="" onClick={this.handleDeletePost.bind(this, post)}>
                    Delete Post
                  </a>
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
    detachAllPins();
    detachAllPosts();
  }
}
