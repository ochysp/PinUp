// @flow

import React from "react";
import { db } from "../../datalayer/firebase/index";

type Props = {
  postId: number
};

type State = {
  title: string
};

export class PostNode extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  componentDidMount() {
    db.onPost(this.props.postId, snapshot => {
      this.updateData(snapshot.val());
    });
  }

  componentWillUnmount() {
    db.detachPost(this.props.postId);
  }

  updateData = (values: any) => {
    let newState = { title: values.title };
    this.setState(newState);
  };

  render() {
    return (
      <li>
        <div>{this.state.title}</div>
      </li>
    );
  }
}
