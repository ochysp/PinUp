// @flow

import React from 'react';
import type Match from 'react-router';
import { listenForPinData, detachPinListener } from '../../business/Pin';
import Matches from '../Match/Matches';
import type { AreaType, SnapshotType, PinType } from '../../Types';

type State = {
  area: ?AreaType
};

type Props = {
  match: Match
};

export default class PinDetails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      area: null,
    };
  }

  componentDidMount() {
    listenForPinData(this.props.match.params.pinId, (snapshot: SnapshotType) => {
      this.updateData(snapshot.val());
    });
  }

  componentWillUnmount() {
    detachPinListener(this.props.match.params.pinId);
  }

  updateData = (values: PinType) => {
    const newState = {
      area: values.area,
    };
    this.setState(newState);
  };

  render() {
    let matches = null;
    if (this.state.area) {
      matches = (
        <Matches area={this.state.area} />
      );
    }
    return (
      <div>
        <h1>Matches</h1>
        {matches}
      </div>
    );
  }
}
