// @flow

import React from 'react';
import { listenForAllPinIDsOfUser } from '../../business/Pin';
import PinNode from './PinNode';
import type { AuthUserType, ConnectionType, KeyType } from '../../Types';

type State = {
  pins: KeyType[],
  dbHandle: ?ConnectionType
};

type Props = {
  authUser: AuthUserType
};

export default class ListPins extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      pins: [],
      dbHandles: null,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      dbHandles: listenForAllPinIDsOfUser(
        this.props.authUser, this.keyEntered, this.keyLeft,
      ),
    });
  }

  componentWillUnmount() {
    if (this.state.dbHandles) this.state.dbHandles.detach();
  }

  keyEntered = (key: KeyType) => {
    this.setState((prevState) => {
      const updatedNearbyPinKeys = prevState.pins.slice();
      updatedNearbyPinKeys.push(key);
      return { pins: updatedNearbyPinKeys };
    });
  };

  keyLeft = (key: KeyType) => {
    this.setState((prevState) => {
      const updatedNearbyPinKeys = prevState.pins.slice();
      updatedNearbyPinKeys.splice(updatedNearbyPinKeys.indexOf(key), 1);
      return { pins: updatedNearbyPinKeys };
    });
  };

  render() {
    const listItems = this.state.pins.map(pinId => <PinNode pinId={pinId} />);
    return (
      <div>
        <h1>My Pins</h1>
        <div>
          <ul>{listItems}</ul>
        </div>
      </div>
    );
  }
}
