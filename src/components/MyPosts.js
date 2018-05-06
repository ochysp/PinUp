// @flow

import React from 'react';
import { Paper, Typography, withStyles } from 'material-ui';
import { listenForPostsIDsOfUser } from '../business/Post';
import type { AuthUserType, ConnectionType, KeyType } from '../business/Types';
import ListOfPosts from './Post/ListOfPosts';
import { styles } from '../style/styles';


type State = {
  posts: KeyType[],
  dbHandle: ?ConnectionType
};

type Props = {
  authUser: AuthUserType,
  classes: any,
};

class MyPosts extends React.Component<Props, State> {
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
      <div className={this.props.classes.flexContainer}>

        <Paper className={this.props.classes.paper} elevation={4}>
          <Typography variant="headline" className={this.props.classes.typographyTitle} >My Posts</Typography>
          <ListOfPosts posts={this.state.posts} authUser={this.props.authUser} />
        </Paper>

      </div>
    );
  }
}

export default withStyles(styles)(MyPosts);
