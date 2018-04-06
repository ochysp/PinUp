// @flow

import React from "react";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { db } from "../datalayer/firebase";
import CreatePin from "./Pin/CreatePin";
import CreatePost from "./Post/TESTING_CreatePost";
import * as leafletValues from '../constants/leafletValues'

type State = {
  center: {lat: number, lng: number},
  zoom: number,

  marker: {lat: number, lng: number},
  markerIsSet: boolean,
  isPin: boolean,
  isPost: boolean,

  circle: {lat: number, lng: number},
  radius: number,

  pins: Array<any>,
  posts: Array<any>
};

type Props = {
  authUser: { uid: string }
};

export default class Home extends React.Component<Props, State> {
  constructor() {

    super();

    let position = {lat: leafletValues.LAT, lng: leafletValues.LNG,};

    this.state = {
      mapCenter: {position},
      zoom: leafletValues.ZOOM,

      marker: {position},
      markerIsSet: false,
      isPin: false,
      isPost: false,

      circle: {position},
      radius: leafletValues.RADIUS,

      pins: [],
      posts: []
    };
  }

  setMarker = (e: any) => {
    let position = e.latlng;
    this.setState({
      markerIsSet: true,
      marker: { position}
    });
  };

  handleSetPin = () => {
    this.setState({ isPin: true, isPost: false });
  };
  handleSetPost = () => {
    this.setState({ isPost: true, isPin: false });
  };

  handleDeletePin(pin){
    db.doDeletePin(this.props.authUser, pin.key)
  }

  render() {
    const {marker, mapCenter, zoom, markerIsSet, isPin, isPost} = this.state;

    const pinForm = isPin ? (
      <CreatePin
          authUser={this.props.authUser}
          position={marker.position}
      />
    ) : null;
    const postForm = isPost ? (
      <CreatePost
        authUser={this.props.authUser}
        position={marker.position}
      />
    ) : null;

    const currentMarker = markerIsSet ? (
      <Marker
        position={marker.position}
        ref="marker"
      >
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
        <Map
          center={mapCenter.position}
          zoom={zoom}
          onClick={this.setMarker}
        >
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

          {this.state.pins.map((pin,index) => (
            <Marker
              key={pin.key}
              position={pin.position}
              ref="pin"
            >
              <Popup>
                <span>
                  My Pin #{index}<br />
                  <a ref='' onClick={this.handleDeletePin.bind(this, pin)}>Delete Pin</a>
                </span>
              </Popup>
              <Circle center={pin.position} radius={pin.radius} ref="circle" />
            </Marker>
          ))}

          {this.state.posts.map((post,index) => (
            <Marker
              key={post.key}
              position={post.position}
              ref="post"
            >
              <Popup>
                <span>My Post #{index}</span>
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

  componentDidMount() {
    db.onAllPins(this.props.authUser.uid, snapshot => {
      if (snapshot.val() === null) {
        this.setState({ pins: [] });
      } else {
        this.setState({
          pins: Object.entries(snapshot.val()).map(([key, value]: [string, any]) => ({
            key,
            ...value,
            position: { lat: value.latitude, lng: value.longitude }
          }))
        });
      }
    });
  }

  componentWillUnmount() {
    db.detachAllPins();
  }
}
