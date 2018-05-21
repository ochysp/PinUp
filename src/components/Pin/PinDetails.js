// @flow

import React from 'react';
import type Match from 'react-router';
import { Typography } from 'material-ui';
import { listenForPinData, detachPinListener } from '../../business/Pin';
import Matches from '../Match/Matches';
import type { AreaType, SnapshotType, PinType, CategoriesType, AuthUserType } from '../../business/Types';

type State = {
  area: ?AreaType,
  categories: CategoriesType
};

type Props = {
  match: Match,
  authUser: AuthUserType
};

export default class PinDetails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      area: null,
      categories: {},
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
      categories: values.categories,
    };
    this.setState(newState);
  };

  render() {
    let matches = null;
    if (this.state.area) {
      matches = (
        <Matches
          area={this.state.area}
          categories={this.state.categories}
          authUser={this.props.authUser}
        />
      );
    }
    return (
      <div>
        <Typography variant="title" gutterBottom>
          Matches
        </Typography>
        {matches}
      </div>
    );
  }
}
