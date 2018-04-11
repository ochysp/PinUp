// @flow

import React from "react";
import { Link } from "react-router-dom";
import {onPin, detachPin} from '../../business/Pin'
import * as routes from "../../constants/routes";

type Props = {
  pinId: number
};

type State = {
  title: string
};

type Pin = {
  title: string
};

export class PinNode extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  componentDidMount() {
    onPin(this.props.pinId, snapshot => {
      this.updateData(snapshot.val());
    });
  }

  componentWillUnmount() {
    detachPin(this.props.pinId);
  }

  updateData(values: Pin) {
    let newState = { title: values.title };
    this.setState(newState);
  }

  render() {
    return (
      <li>
        <Link className="item" to={routes.PINS + "/" + this.props.pinId}>
          {this.state.title}
        </Link>
      </li>
    );
  }
}
