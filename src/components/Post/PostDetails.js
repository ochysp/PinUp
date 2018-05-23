// @flow

import React from 'react';
import {
  List, Button,
  ExpansionPanelActions, ExpansionPanelDetails,
  Grid,
  ListSubheader,
  Typography,
  withStyles,
} from '@material-ui/core';
import { doSignOutOfEvent, doSignUpForEvent } from '../../business/Event';
import type { AuthUserType, PostType } from '../../business/Types';
import { CATEGORIES } from '../../constants/categories';

type State = {
  takesPart: boolean
};

type Props = {
  postData: PostType,
  authUser: AuthUserType,
  onCloseClicked: () => void;
};

class PostDetails extends React.Component<Props, State> {
  handleNewParticipant = () => {
    if (this.props.postData.postId) {
      doSignUpForEvent(
        this.props.postData.postId, this.props.authUser,
        () => { /* TODO: onSuccess */ }, () => { /* TODO: onSuccess */ },
      );
    }
  };
  handleDeleteParticipant = () => {
    if (this.props.postData.postId) {
      doSignOutOfEvent(
        this.props.postData.postId, this.props.authUser,
        () => { /* TODO: onSuccess */ }, () => { /* TODO: onSuccess */ },
      );
    }
  };

  render() {
    let eventButton = null;
    if (this.props.postData.event) {
      eventButton = this.props.postData.event.participants
      && this.props.postData.event.participants[this.props.authUser.uid]
        ? <Button onClick={this.handleDeleteParticipant}>Revoke Sign up</Button>
        : <Button color="secondary" onClick={this.handleNewParticipant}>Sign me up!</Button>;
    }

    return (
      <div>

        <DialogContent>
          <List>
            <ListItem>
              <ListItemText primary="Description" secondary={this.props.postData.description} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Category" secondary={CATEGORIES[this.props.postData.category]} />
            </ListItem>
          </List>
        </DialogContent>

        <DialogActions>
          {eventButton}
          <Button onClick={this.props.onCloseClicked}>Close</Button>
        </DialogActions>

      </div>
    );
  }
}

export default PostDetails;
