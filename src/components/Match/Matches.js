// @flow

import React from 'react';
import { List, withStyles } from 'material-ui';
import listenForPostsIDsInArea from '../../business/Match';
import PostListEntry from '../Post/PostListEntry';
import type {
  KeyType,
  ConnectionType, AreaType, CategoriesType,
} from '../../business/Types';

type State = {
  posts: KeyType[],
  dbHandles: ?ConnectionType
};

type Props = {
  classes: any,
  area: AreaType,
  categories: CategoriesType
};

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class Matches extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      posts: [],
      dbHandles: [],
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      dbHandles: listenForPostsIDsInArea(
        {
          location: {
            latitude: this.props.area.location.latitude,
            longitude: this.props.area.location.longitude,
          },
          radius: this.props.area.radius,
        },
        this.props.categories,
        this.keyEntered,
        this.keyLeft,
      ),
    });
  }

  componentWillUnmount() {
    this.state.dbHandles.forEach(handle => handle.detach());
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
      <PostListEntry postId={postId} />
    ));
    return (
      <div className={this.props.classes.root}>
        <List component="nav">
          {listItems}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Matches);
