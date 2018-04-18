// @flow

import React from 'react';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import type { LatLng } from 'react-leaflet/es/types';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
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

  drawer: boolean,
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

      drawer: false,
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

  handleDeletePin = (pin: PinInfoType) => {
    if (pin.pinId) {
      doDeletePin(this.props.authUser, pin.pinId);
    } else {
      // eslint-disable-next-line no-throw-literal
      throw 'pin can not be deleted because no pinId was provided';
    }
  };

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
          <PopupAdapter
            onOpen={() => this.setState({ drawer: true })}
            onClose={() => this.setState({ drawer: false })}
          />
        </Popup>

      </Marker>
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
            <Marker key={pin.pinId} position={convertToLeafletLocation(pin.area.location)} ref="pin">
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
                ref="circle"
              />
            </Marker>
          ))}

          {currentMarker}

        </Map>
        {pinForm}
        {postForm}
      </div>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class PopupAdapter extends React.Component<{onOpen: () => void, onClose: () => void}> {
  componentDidMount() {
    this.props.onOpen();
  }

  componentWillUnmount() {
    this.props.onClose();
  }

  render() {
    return (null);
  }
}
