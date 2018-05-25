// @flow

import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { getUserName } from '../../business/User';
import type { KeyType } from '../../business/Types';

type State = {
  name: string,
};

type Props = {
  userId: KeyType,
};

class UserListEntry extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { name: '' };
  }

  componentDidMount() {
    getUserName(this.props.userId, username => this.setState({ name: username }));
  }

  render() {
    if (this.state.name) {
      return (
        <ListItem style={{ paddingRight: '0px' }}>
          <ListItemText primary={this.state.name} style={{ paddingRight: '0px' }} />
        </ListItem>
      );
    }
    return null;
  }
}

export default UserListEntry;
