// @flow

import React from 'react';
import listenForPostsIDsInArea from '../../business/Match';
import { PostNode } from '../Post/PostNode';
import type {
  KeyType,
  ConnectionType, AreaType,
} from '../../Types';

type State = {
  posts: KeyType[],
  dbHandle: ?ConnectionType
};

type Props = {
  area: AreaType
};

export default class Matches extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
      dbHandle: null,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      dbHandle: listenForPostsIDsInArea(
        {
          location: {
            latitude: this.props.area.location.latitude,
            longitude: this.props.area.location.longitude,
          },
          radius: this.props.area.radius,
        },
        this.keyEntered,
        this.keyLeft,
      ),
    });
  }

  componentWillUnmount() {
    if (this.state.dbHandle) this.state.dbHandle.detach();
  }

  keyEntered = (key: KeyType) => {
    this.setState((prevState: State) => {
      const updatedNearbyPostKeys = prevState.posts.slice();
      updatedNearbyPostKeys.push(key);
      return { posts: updatedNearbyPostKeys };
    });
  };

  keyLeft = (key: KeyType) => {
    this.setState((prevState) => {
      const updatedNearbyPostKeys = prevState.posts.slice();
      updatedNearbyPostKeys.splice(updatedNearbyPostKeys.indexOf(key), 1);
      return { posts: updatedNearbyPostKeys };
    });
  };

  render() {
    const listItems = this.state.posts.map(postId => (
      <PostNode postId={postId} />
    ));
    return (
      <div>
        <ul>{listItems}</ul>
      </div>
    );
  }
}
