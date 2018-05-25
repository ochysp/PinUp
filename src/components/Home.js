// @flow
/* eslint-disable react/jsx-no-bind,react/sort-comp,react/no-string-refs */

import React from 'react';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import {
  deletePin,
  detachAllPinListeners,
  listenForAllPinsWithMatchesOfUser,
} from '../business/Pin';
import { deletePost, detachAllPostListeners, listenForAllPostsOfUser } from '../business/Post';
import CreatePinForm from './Pin/CreatePinForm';
import CreatePostForm from './Post/CreatePostForm';
import type {
  AuthUserType,
  FormPinType,
  FormPostType,
  LocationType,
  PinType,
  PostType,
} from '../business/Types';
import SelectionDialog from './FormComponents/SelectionDialog';
import { homeStyles } from '../style/styles';
import PinUpMap from './PinUpMap';
import type { MarkerType } from '../business/Marker';
import { PIN, POST, UNDEFINED } from '../business/Marker';
import * as leafletValues from '../constants/leafletValues';

const CHOOSER_DIALOG = 'chooserDialog';
const EDIT_PIN_FORM = 'editPinForm';
const EDIT_POST_FORM = 'editPostForm';

type ActiveComponent = CHOOSER_DIALOG | EDIT_PIN_FORM | EDIT_POST_FORM;

type State = {
  pins: Array<PinType>,
  posts: Array<PostType>,

  currentMarkerIsSet: boolean,
  currentMarkerLocation: ?LocationType,
  currentMarkerType: MarkerType,

  postToEdit: PostType,
  pinToEdit: PinType,

  activeComponent: ?ActiveComponent,
};

type Props = {
  authUser: AuthUserType,
  classes: any,
};

class Home extends React.Component<Props, State> {
  handleNewMarkerSet = (location) => {
    this.setState({
      currentMarkerIsSet: true,
      currentMarkerLocation: location,
      currentMarkerType: UNDEFINED,
      activeComponent: CHOOSER_DIALOG,
    });
  };
  handleMarkerLocationChange = (location) => {
    const newPostToEdit = Object.assign({}, this.state.postToEdit);
    newPostToEdit.location = location;
    const newPinToEdit = Object.assign({}, this.state.pinToEdit);
    newPinToEdit.area.location = location;
    this.setState({
      currentMarkerLocation: location,
      pinToEdit: newPinToEdit,
      postToEdit: newPostToEdit,
    });
  };
  handleEditExistingPin = (pin: PinType) => {
    this.setState({
      pinToEdit: pin,
      currentMarkerType: PIN,
      activeComponent: EDIT_PIN_FORM,
      currentMarkerIsSet: true,
      currentMarkerLocation: pin.area.location,
    });
  };
  handleEditExistingPost = (post: PostType) => {
    this.setState({
      postToEdit: post,
      currentMarkerType: POST,
      activeComponent: EDIT_POST_FORM,
      currentMarkerIsSet: true,
      currentMarkerLocation: post.location,
    });
  };
  handleCreateNewPin = () => {
    this.setState({
      pinToEdit: this.initializePinData(this.state.currentMarkerLocation),
      activeComponent: EDIT_PIN_FORM,
      currentMarkerType: PIN,
    });
  };
  handleCreateNewPost = () => {
    this.setState({
      postToEdit: this.initializePostData(this.state.currentMarkerLocation),
      activeComponent: EDIT_POST_FORM,
      currentMarkerType: POST,
    });
  };
  closeDialogs = () => this.setState({
    activeComponent: null,
    currentMarkerIsSet: false,
    currentMarkerType: UNDEFINED,
  });

  constructor(props: Props) {
    super(props);

    this.state = {

      pins: [],
      posts: [],

      currentMarkerIsSet: false,
      currentMarkerLocation: null,
      currentMarkerType: UNDEFINED,

      postToEdit: this.initializePostData(),
      pinToEdit: this.initializePinData(),

      activeComponent: null,
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

  initializePinData(location = leafletValues.DEFAULT_POSITION): FormPinType {
    return {
      userId: this.props.authUser.uid,
      title: '',
      area: { location, radius: 3 },
      categories: {},
    };
  }

  initializePostData(location = leafletValues.DEFAULT_POSITION): FormPostType {
    return {
      userId: this.props.authUser.uid,
      title: '',
      location,
      category: '',
    };
  }

  render() {
    const {
      pins, posts, currentMarkerLocation, pinToEdit,
      postToEdit, activeComponent, currentMarkerType, currentMarkerIsSet,
    } = this.state;

    const {
      authUser, classes,
    } = this.props;

    const pinupMap = (
      <PinUpMap
        center={activeComponent ? currentMarkerLocation : null}

        pins={pins}
        posts={posts}

        showMyEntries={activeComponent !== EDIT_PIN_FORM && activeComponent !== EDIT_POST_FORM}

        currentMarkerIsSet={currentMarkerIsSet}
        currentMarkerLocation={currentMarkerLocation}
        currentMarkerType={currentMarkerType}
        currentMarkerRadius={pinToEdit.area.radius}

        onMarkerLocationChange={this.handleMarkerLocationChange}
        onNewMarker={this.handleNewMarkerSet}

        onEditPost={this.handleEditExistingPost}
        onEditPin={this.handleEditExistingPin}

        onDeletePin={pin => deletePin(authUser, pin.pinId)}
        onDeletePost={post => deletePost(authUser, post)}
      />
    );

    const selectionDialog = (
      <SelectionDialog
        handleSelectPin={this.handleCreateNewPin}
        handleSelectPost={this.handleCreateNewPost}
        dialogIsActive={activeComponent === CHOOSER_DIALOG}
        onClose={this.closeDialogs}
      />
    );

    const pinForm = (activeComponent === EDIT_PIN_FORM) ? (
      <CreatePinForm
        className={classes.editRoot}
        pinData={pinToEdit}
        onPinDataChange={pinData => this.setState({ pinToEdit: pinData })}
        onDone={this.closeDialogs}
      />
    ) : null;

    const postForm = (activeComponent === EDIT_POST_FORM) ? (
      <CreatePostForm
        className={classes.editRoot}
        postData={postToEdit}
        onPostDataChange={postData => this.setState({ postToEdit: postData })}
        onDone={this.closeDialogs}
      />
    ) : null;

    return (
      <div className={classes.homeRoot}>
        <div className={classes.mapRoot}>
          {pinupMap}
          {selectionDialog}
          <div />
        </div>
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

export default withRouter(withStyles(homeStyles)(Home));
