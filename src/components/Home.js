// @flow
/* eslint-disable react/jsx-no-bind,react/sort-comp,react/no-string-refs */

import React from 'react';
import { Map, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import type { LatLng } from 'leaflet';
import { withStyles, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';
import { detachAllPinListeners, deletePin, listenForAllPinsWithMatchesOfUser } from '../business/Pin';
import { detachAllPostListeners, listenForAllPostsOfUser, deletePost } from '../business/Post';
import CreatePinForm from './Pin/CreatePinForm';
import CreatePostForm from './Post/CreatePostForm';
import * as leafletValues from '../constants/leafletValues';
import type { AuthUserType, LocationType, PinType, PostType } from '../business/Types';
import SelectionDialog from './FormComponents/SelectionDialog';
import { CATEGORIES } from '../constants/categories';
import { newIcon, numberedPinIcon, pinIcon, postIcon } from '../img/LeafletIcons';
import { styles } from '../style/styles';
import * as routes from '../constants/routes';

const upperMapBoundLng = 180;
const lowerMapBoundLng = -180;
const upperMapBoundLat = 90;
const lowerMapBoundLat = -90;
const moveToGetNextMap = 360;
const viewMinimumZoomRestriction = 2;

const convertToLeafletLocation = (location: LocationType): LatLng => (
  { lat: location.latitude, lng: location.longitude }
);

const convertToValidLocation = (location: LatLng): LatLng => {
  const correctedLocation = { lat: location.lat, lng: location.lng };
  while (correctedLocation.lng > upperMapBoundLng || correctedLocation.lng < lowerMapBoundLng) {
    if (correctedLocation.lng > upperMapBoundLng) {
      correctedLocation.lng -= moveToGetNextMap;
    } else if (correctedLocation.lng < lowerMapBoundLng) {
      correctedLocation.lng += moveToGetNextMap;
    }
  }
  return correctedLocation;
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

  userMarkerPosition: LatLng,
  userMarkerIsSet: boolean,
  userMarkerIsPin: boolean,
  userMarkerIsPost: boolean,
  userMarkerRadius: number,

  pins: Array<PinType>,
  posts: Array<PostType>,

  editablePost: ?PostType,
  editablePin: ?PinType,

  chooserDialogIsActive: boolean
};

type Props = {
  authUser: AuthUserType,
  classes: any,
  history: any,
};

class Home extends React.Component<Props, State> {
  constructor() {
    super();

    const position = { lat: leafletValues.LAT, lng: leafletValues.LNG };

    this.state = {
      center: position,
      zoom: leafletValues.ZOOM,

      userMarkerPosition: position,
      userMarkerIsSet: false,
      userMarkerIsPin: false,
      userMarkerIsPost: false,
      userMarkerRadius: 0,

      pins: [],
      posts: [],

      editablePost: null,
      editablePin: null,

      chooserDialogIsActive: false,
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
      userMarkerPosition: position,
      userMarkerIsSet: true,
      userMarkerIsPin: false,
      userMarkerIsPost: false,
      userMarkerRadius: 2,

      chooserDialogIsActive: true,

      editablePost: null,
      editablePin: null,
    });
  };

  handleEditPinRequest = () => {
    this.setState({ userMarkerIsPin: true, userMarkerIsPost: false, chooserDialogIsActive: false });
  };
  handleEditPostRequest = () => {
    this.setState({ userMarkerIsPost: true, userMarkerIsPin: false, chooserDialogIsActive: false });
  };
  unsetMarker = () => {
    this.setState({ userMarkerIsSet: false });
  };

  handleDeletePin = (pin: PinType) => () => {
    deletePin(this.props.authUser, pin.pinId);
    this.unsetMarker();
  };

  handleEditPin = (pin: PinType) => () => {
    this.handleEditPinRequest();
    this.setState({ editablePin: pin });
  };

  handleCloseDialogs = () => this.setState({
    userMarkerIsSet: false,
    userMarkerIsPin: false,
    userMarkerIsPost: false,
    chooserDialogIsActive: false,
    editablePost: null,
    editablePin: null,
  });

  handleDeletePost = (post: PostType) => () => {
    deletePost(this.props.authUser, post);
    this.unsetMarker();
  };

  handleEditPost = (post: PostType) => () => {
    this.handleEditPostRequest();
    this.setState({ editablePost: post });
  };

  showMatches = (pin: PinType) => () => {
    this.props.history.push(`${routes.PINS}?pinId=${pin.pinId}`);
  };

  showPost = (post: PostType) => () => {
    this.props.history.push(`${routes.POSTS}?postId=${post.postId}`);
  };

  render() {
    const {
      center, zoom,
      userMarkerPosition, userMarkerIsSet, userMarkerIsPin, userMarkerIsPost, userMarkerRadius,
    } = this.state;

    const {
      matchesButton, editButton, deleteButton, popup, popupDiv,
      flexContainer, spaceAbove, PostButton, spaceUnder,
    } = this.props.classes;

    const pinForm = userMarkerIsPin ? (
      <CreatePinForm
        authUser={this.props.authUser}
        position={convertToLocationType(userMarkerPosition)}
        editablePin={this.state.editablePin}
        onDone={this.handleCloseDialogs}
        defaultRadius={this.state.userMarkerRadius}
        onRadiusChange={radius => this.setState({ userMarkerRadius: radius })}
      />
    ) : null;

    const postForm = userMarkerIsPost ? (
      <CreatePostForm
        authUser={this.props.authUser}
        position={convertToLocationType(userMarkerPosition)}
        editablePost={this.state.editablePost}
        onDone={this.handleCloseDialogs}
      />
    ) : null;

    let userMarker = null;
    if (userMarkerIsSet) {
      let userMarkerIcon;
      if (userMarkerIsPin) {
        userMarkerIcon = pinIcon;
      } else if (userMarkerIsPost) {
        userMarkerIcon = postIcon;
      } else {
        userMarkerIcon = newIcon;
      }

      userMarker = (
        <Marker
          position={userMarkerPosition}
          ref="marker"
          color="white"
          icon={userMarkerIcon}
        >
          {userMarkerIsPin && <Circle
            center={userMarkerPosition}
            radius={convertToLeafletRadius(userMarkerRadius)}
            color="white"
          />}
        </Marker>
      );
    }


    const selectionDialog = (
      <SelectionDialog
        handleSelectPin={this.handleEditPinRequest}
        handleSelectPost={this.handleEditPostRequest}
        dialogIsActive={this.state.chooserDialogIsActive}
        onClose={() => (this.setState({
          userMarkerIsSet: false,
          chooserDialogIsActive: false,
        }))}
      />
    );

    return (
      <div className={this.props.classes.mapRoot}>
        <Map
          center={center}
          zoom={zoom}
          minZoom={viewMinimumZoomRestriction}
          maxBounds={[[lowerMapBoundLat, lowerMapBoundLng], [upperMapBoundLat, upperMapBoundLng]]}
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
                <div className={popup}>
                  <div className={popupDiv}>

                    <Typography variant="title" className={spaceAbove}>{pin.title}</Typography>
                    <Typography variant="caption" className={`${spaceUnder} ${spaceAbove}`}> {Object.keys(pin.categories).map(catId => (CATEGORIES[catId])).join(', ')} </Typography>

                    <Divider />

                    <div className={`${flexContainer} ${spaceAbove}`}>
                      <Button className={editButton} onClick={this.handleEditPin(pin)}>
                      Edit
                      </Button>
                      <Button className={deleteButton} onClick={this.handleDeletePin(pin)}>
                      Delete
                      </Button>
                    </div>

                    <Button variant="raised" id="show-matches-button" className={`${matchesButton} ${spaceAbove}`} onClick={this.showMatches(pin)}>
                    Show Matches
                    </Button>

                  </div>
                </div>
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
                <div className={popup}>
                  <div className={popupDiv}>

                    <Typography variant="title" className={spaceAbove}>{post.title}</Typography>
                    <Typography variant="caption" className={`${spaceUnder} ${spaceAbove}`}>{CATEGORIES[post.category]}</Typography>

                    <Divider />

                    <div className={`${flexContainer} ${spaceAbove}`}>
                      <Button className={editButton} onClick={this.handleEditPost(post)}>
                    Edit
                      </Button>
                      <Button className={deleteButton} onClick={this.handleDeletePost(post)}>
                    Delete
                      </Button>
                    </div>

                    <Button variant="raised" id="show-post-button" className={`${PostButton} ${spaceAbove}`} onClick={this.showPost(post)}>
                    Show Post
                    </Button>

                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          {userMarker}
        </Map>
        {selectionDialog}
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

export default withRouter(withStyles(styles)(Home));
