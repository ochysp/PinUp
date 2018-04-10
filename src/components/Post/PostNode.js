// @flow

import React from "react";
import {onPost, detachPost} from '../../business/Post'

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
    onPost(this.props.postId, snapshot => {
      this.updateData(snapshot.val());
    });
  }

  componentWillUnmount() {
    detachPost(this.props.postId);
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
