// @flow

import React from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import type { AuthUserType, PostType } from '../../business/Types';
import { CategoryType, EventType, KeyType, LocationType } from '../../business/Types';

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
    this.state = {
      takesPart: false,
    };
  }

  handleClose = () => {

  };

  handleTakePart = () => {

  };
  /*
    export type PostType = {
      postId?: KeyType,
      userId: KeyType,
      title: string,
      location: LocationType,
      category: CategoryType,
      event?: EventType
    };
  */
  render() {
    const eventButton = this.props.event !== null ? (
      <Button onClick={addToEvent}>Take Part in event</Button>
    ) : null;

    return (
      <Dialog>
        <DialogTitle>Post Information</DialogTitle>
        <div>
          <List>
            {eventButton}
            <Button>Close</Button>
          </List>
        </div>
      </Dialog>
    );
  }
}
