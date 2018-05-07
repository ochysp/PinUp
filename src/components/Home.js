// @flow
/* eslint-disable react/jsx-no-bind,react/sort-comp,react/no-string-refs */

import React from 'react';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import type { LatLng } from 'react-leaflet/es/types';
import { withStyles, Button } from 'material-ui';
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
import SelectionDrawer from './MaterialComponents/SelectionDialog';
import { CATEGORIES } from '../constants/categories';
import { numberedPinIcon, pinIcon, postIcon } from '../img/LeafletIcons';
import { styles } from '../style/styles';

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

const convertToLeafletRadius = (radius: number): number => (radius * 1000);

type State = {
  center: LatLng,
  zoom: number,

  marker: LatLng,
  markerIsSet: boolean,
  isPin: boolean,
  isPost: boolean,

  pins: Array<PinType>,

  dialogIsActive: boolean,
  posts: Array<PostType>,
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

  handleDeletePost = (post: PostType) => () => {
    if (post.postId) {
      deletePost(this.props.authUser, post);
      this.unsetMarker();
    } else {
      // eslint-disable-next-line no-throw-literal
      throw 'post can not be deleted because no postId was provided';
    }
  };

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
          onClick={this.setMarker}
          className={this.props.classes.map}
        >
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

          {this.state.pins.map((pin: PinType, index) => (
            <Marker
              key={pin.pinId}
              position={convertToLeafletLocation(pin.area.location)}
              icon={pin.matches ? numberedPinIcon(pin.matches.length) : pinIcon}
            >
              <Popup>
                <span>
                  {pin.title} #{index}
                  <br />
                  {Object.keys(pin.categories).map(catId => (CATEGORIES[catId])).join(', ')}
                  <br />
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

          {this.state.posts.map((post: PostType, index) => (
            <Marker
              key={post.postId}
              position={convertToLeafletLocation(post.location)}
              icon={postIcon}
            >
              <Popup>
                <span>
                  {post.title} #{index}
                  <br />
                  {CATEGORIES[post.category]}
                  <br />
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
