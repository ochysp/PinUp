// @flow

import React from 'react';
import { ListItem, ListItemText } from 'material-ui';
import { Redirect } from 'react-router';
import * as routes from '../../constants/routes';
import type { PinType } from '../../business/Types';

type Props = {
  pinData: PinType
};

type State = {
  redirect: boolean
}

export default class PinListEntry extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={`${routes.PINS}/${this.props.pinData.pinId ? this.props.pinData.pinId : ''}`} />;
    }

    return (
      <ListItem button onClick={this.handleClick}>
        <ListItemText primary={this.props.pinData.title} />
      </ListItem>
    );
  }
}
