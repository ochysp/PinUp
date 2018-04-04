// @flow

import React from "react";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { db } from "../backend/firebase";
import CreatePinForm from "./Pin/TESTING_CreatePin";
import CreatePostForm from "./Post/TESTING_CreatePost";

type State = {
  markerIsSet: boolean,
  isPin: boolean,
  isPost: boolean,
  center: {
    lat: number,
    lng: number
  },
  marker: {
    lat: number,
    lng: number
  },
  circle: {
    lat: number,
    lng: number
  },
  zoom: number,
  radius: number,
  pins: Array<any>
};

type Props = {
  authUser: { uid: string }
};

export default class Home extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      markerIsSet: false,
      center: {
        lat: 47.22354,
        lng: 8.81714
      },
      marker: {
        lat: 47.22354,
        lng: 8.1714
      },
      circle: {
        lat: 47.22354,
        lng: 8.1714
      },
      zoom: 13,
      radius: 200,
      isPin: false,
      isPost: false,
      pins: [],
      posts: []
    };
  }

  setMarker = (e: any) => {
    const { lat, lng } = e.latlng;
    this.setState({
      markerIsSet: true,
      marker: { lat, lng }
    });
  };

  handleSetPin = () => {
    this.setState({ isPin: true, isPost: false });
  };
  handleSetPost = () => {
    this.setState({ isPost: true, isPin: false });
  };

  render() {
    const pinForm = this.state.isPin ? (
      <CreatePinForm
          authUser={this.props.authUser}
          lat={this.state.marker.lat}
          lng={this.state.marker.lng}
      />
    ) : null;
    const postForm = this.state.isPost ? (
      <CreatePostForm authUser={this.props.authUser} />
    ) : null;

    const marker = this.state.markerIsSet ? (
      <Marker
        position={this.state.marker}
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
          center={this.state.center}
          zoom={this.state.zoom}
          onClick={this.setMarker}
        >
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

          {this.state.pins.map(pin => (
            <Marker
              key={pin.key}
              draggable={true}
              position={pin.position}
              ref="pin"
            >
              <Popup>
                <span>I am a draggable Pin</span>
              </Popup>
              <Circle center={pin.position} radius={pin.radius} ref="circle" />
            </Marker>
          ))}
          {marker}
        </Map>
        {pinForm}
        {postForm}
      </div>
    );
  }

  componentDidMount() {
    db.onAllPins(this.props.authUser.uid, snapshot => {
      console.log(snapshot.val());
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
