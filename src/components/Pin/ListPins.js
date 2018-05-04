// @flow

import React from 'react';
import { List, withStyles } from 'material-ui';
import { detachAllPinListeners, listenForAllPinsOfUser } from '../../business/Pin';
import PinListEntry from './PinListEntry';
import type { AuthUserType, PinType } from '../../business/Types';

type State = {
  pins: PinType[],
};

type Props = {
  authUser: AuthUserType,
  classes: any,
};

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class ListPins extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      pins: [],
    };
  }

  componentDidMount() {
    listenForAllPinsOfUser(this.props.authUser.uid, (newData: PinType[]) => {
      this.setState({ pins: newData });
    });
  }

  componentWillUnmount() {
    detachAllPinListeners();
  }

  render() {
    const listItems = this.state.pins.map(pin => (
      <PinListEntry pinData={pin} authUser={this.props.authUser} key={pin.pinId} />
    ));
    return (
      <div>
        <div className={this.props.classes.root}>
          <List component="nav">
            {listItems}
          </List>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ListPins);
