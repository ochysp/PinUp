// @flow

import React from 'react';
import { listenForPostData, detachPostListener } from '../../business/Post';
import type { PostType, SnapshotType, KeyType } from '../../business/Types';
import * as routes from '../../constants/routes';

type Props = {
  postId: KeyType
};

type State = {
  title: string
};

// eslint-disable-next-line import/prefer-default-export
export class PostNode extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
    };
  }

  componentDidMount() {
    listenForPostData(this.props.postId, (snapshot: SnapshotType) => {
      this.updateData(snapshot.val());
    });
  }

  componentWillUnmount() {
    detachPostListener(this.props.postId);
  }

  updateData = (values: PostType) => {
    const newState = { title: values.title };
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
