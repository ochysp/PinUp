/* eslint-disable no-useless-constructor */
// @flow

import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import { doSignUpForEvent } from '../../business/Event';
import type { AuthUserType, PostType } from '../../business/Types';
// import { CategoryType, EventType, KeyType, LocationType } from '../../business/Types';

type State = {
  takesPart: boolean
};

type Props = {
  postData: PostType,
  authUser: AuthUserType,
};

export default class PostDetails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }


  handleNewParticipant = () => {
    doSignUpForEvent(this.props.postData.postId, this.props.authUser);
  };

  render() {
    const eventButton = this.props.postData.event ? (
      <Button onClick={this.handleNewParticipant}>Take Part in event</Button>
    ) : null;
    return (
      <div>
        <List>
          <ListItem>
            <ListItemText primary="Category" secondary={this.props.postData.category} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Description" secondary="Some more Info about event" />
          </ListItem>
          {eventButton}
          <Button>Close</Button>
        </List>
      </div>
    );
  }
}
