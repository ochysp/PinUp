// @flow

import React from 'react';
import { listenForPostsIDsOfUser } from '../business/Post';
import type { AuthUserType, ConnectionType, KeyType } from '../business/Types';
import ListOfPosts from './Post/ListOfPosts';

type State = {
  posts: KeyType[],
  dbHandle: ?ConnectionType
};

type Props = {
  authUser: AuthUserType
};

export default class MyPosts extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      posts: [],
      dbHandle: null,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      dbHandle: listenForPostsIDsOfUser(
        this.props.authUser, this.keyEntered, this.keyLeft,
      ),
    });
  }

  componentWillUnmount() {
    if (this.state.dbHandle) this.state.dbHandle.detach();
  }

  keyEntered = (key: KeyType) => {
    this.setState((prevState) => {
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
    return (
      <ListOfPosts posts={this.state.posts} />
    );
  }
}
