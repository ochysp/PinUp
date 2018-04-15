// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { listenForPinData, detachPinListener } from '../../business/Pin';
import * as routes from '../../constants/routes';
import type { PinInfoType, SnapshotType, KeyType } from '../../Types';

type Props = {
  pinId: KeyType
};

type State = {
  title: string
};

export default class PinNode extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  componentDidMount() {
    listenForPinData(this.props.pinId, (snapshot: SnapshotType) => {
      this.updateData(snapshot.val());
    });
  }

  componentWillUnmount() {
    detachPinListener(this.props.pinId);
  }

  updateData(values: PinInfoType) {
    const newState = { title: values.title };
    this.setState(newState);
  }

  render() {
    return (
      <li>
        <Link className="item" to={`${routes.PINS}/${this.props.pinId}`}>
          {this.state.title}
        </Link>
      </li>
    );
  }
}
