// @flow

import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { Button } from 'material-ui';
import { doSignUpForEvent } from '../../business/Event';
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

  render() {
    const eventButton = this.props.postData.event ? (
      <Button onClick={this.handleNewParticipant}>Take Part in event</Button>
    ) : null;
    return (
      <div>
        <List>
          <ListItem>
            <ListItemText primary="Category" secondary={CATEGORIES[this.props.postData.category]} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Description" secondary="Some more Info about event" />
          </ListItem>
          {eventButton}
          <Button onClick={this.props.onCloseClicked}>Close</Button>
        </List>
      </div>
    );
  }
}

export default PostDetails;
