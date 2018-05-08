// @flow

import React from 'react';
import { ListItem, ListItemText } from 'material-ui';
import type { PinType } from '../../business/Types';

type Props = {
  pinData: PinType,
  onListEntryClick: () => void,
};

type State = {
}

export default class PinListEntry extends React.Component<Props, State> {
  handleClick = () => {
    this.props.onListEntryClick();
  };

  render() {
    return (
      <ListItem button onClick={this.handleClick}>
        <ListItemText primary={this.props.pinData.title} />
      </ListItem>
    );
  }
}
