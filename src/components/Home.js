// @flow

import React from "react";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { db } from "../backend/firebase";
import CreatePin from "./Pin/CreatePin";
import CreatePost from "./Post/TESTING_CreatePost";

type State = {
  isPin: boolean,
  isPost: boolean,
  center: {
    lat: number,
    lng: number
  },
  markerIsSet: boolean,
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
  pins: Array<any>,
  posts: Array<any>
};

type Props = {
  authUser: { uid: string }
};

export default class Home extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      center: {
        lat: 47.22354,
        lng: 8.81714
      },
      markerIsSet: false,
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

  handleDeletePin(pin){
    console.log(pin.key)
    db.doDeletePin(pin.key)
  }

  render() {
    const pinForm = this.state.isPin ? (
      <CreatePin
          authUser={this.props.authUser}
          lat={this.state.marker.lat}
          lng={this.state.marker.lng}
      />
    ) : null;
    const postForm = this.state.isPost ? (
      <CreatePost
        authUser={this.props.authUser}
        lat={this.state.marker.lat}
        lng={this.state.marker.lng}
      />
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
              <Circle center={post.position} radius={post.radius} ref="circle" />
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
