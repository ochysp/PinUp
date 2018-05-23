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
import UserListEntry from './UserListEntry';
import { styles } from '../../style/styles';

type State = {
  takesPart: boolean
};

type Props = {
  postData: PostType,
  authUser: AuthUserType,
  classes: any,
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
    let eventParticipantsListEntries = null;
    let eventParticipantsList = null;

    if (this.props.postData.event) {
      eventButton = this.props.postData.event.participants
      && this.props.postData.event.participants[this.props.authUser.uid]
        ? (
          <Button
            size="small"
            onClick={this.handleDeleteParticipant}
          >
            Revoke Sign up
          </Button>)
        : (
          <Button
            size="small"
            onClick={this.handleNewParticipant}
            color="secondary"
          >
            Sign me up!
          </Button>);

      eventParticipantsListEntries = this.props.postData.event.participants
        ? Object.keys(this.props.postData.event.participants)
          .map(userId => (<UserListEntry userId={userId} key={userId} />))
        : (
          <Typography variant="caption">
            No Participants jet.
          </Typography>
        );

      eventParticipantsList = (
        <div>
          <List
            dense
            subheader={<ListSubheader component="div" className={this.props.classes.participantsSubheader}>Participants</ListSubheader>}
          >
            {eventParticipantsListEntries}
          </List>
        </div>
      );
    }

    return (
      <div>
        <ExpansionPanelDetails>

          <Grid container>

            <Grid item xs={7}>
              <Typography style={{ paddingRight: '16px' }}>
                {this.props.postData.description}
              </Typography>
            </Grid>

            {eventParticipantsList &&
              <Grid style={{ padding: '0px' }} item xs={5} className={this.props.classes.sideSection}>
                {eventParticipantsList}
              </Grid>
            }
          </Grid>
        </ExpansionPanelDetails>

        {eventButton &&
          <ExpansionPanelActions style={{ justifyContent: 'left', paddingTop: 0 }}>
            {eventButton}
          </ExpansionPanelActions>
        }

      </div>
    );
  }
}

export default withStyles(styles)(PostDetails);
