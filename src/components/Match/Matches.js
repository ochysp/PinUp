// @flow

import React from "react";
import {onNearbyPosts} from '../../business/Match'
import { PostNode } from "../Post/PostNode";

type DbHandle = {
  detach: () => {}
};

type State = {
  posts: number[],
  dbHandle: ?DbHandle
};

type Props = {
  latitude: number,
  longitude: number,
  radius: number
};

export default class Matches extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      posts: [],
      dbHandle: null
    };
  }

  componentDidMount() {
    this.setState({
      dbHandle: onNearbyPosts(
        this.props.latitude,
        this.props.longitude,
        this.props.radius,
        this.keyEntered,
        this.keyLeft
      )
    });
  }

  componentWillUnmount() {
    if (this.state.dbHandle) this.state.dbHandle.detach();
  }

  keyEntered = (key: *, location: *, distance: *) => {
    this.setState((prevState: State) => {
      const updatedNearbyPostKeys = prevState.posts.slice();
      updatedNearbyPostKeys.push(key);
      return { posts: updatedNearbyPostKeys };
    });
  };

  keyLeft = (key: *, location: *, distance: *) => {
    this.setState(prevState => {
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
