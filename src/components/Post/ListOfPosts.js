// @flow

import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import PostListEntry from './PostListEntry';
import type { AuthUserType, KeyType } from '../../business/Types';
import { styles } from '../../style/styles';

type State = {
  expanded: ?KeyType,
}

type Props = {
  posts: KeyType[],
  authUser: AuthUserType,
  classes: any,
// eslint-disable-next-line react/no-unused-prop-types
  defaultOpen?: KeyType[],
};

class ListOfPosts extends React.Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props) {
    if (nextProps.defaultOpen) {
      return { expanded: nextProps.defaultOpen };
    }
    return null;
  }

  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : null,
    });
  };

  render() {
    const listItems = this.props.posts.map(postId => (
      <PostListEntry
        postId={postId}
        key={postId}
        authUser={this.props.authUser}
        expanded={this.state.expanded}
        handleChange={this.handleChange}
      />
    ));
    return (
      this.props.posts.length > 0
        ? <div>{listItems}</div>
        : <Typography variant="caption" className={this.props.classes.typographyEmptyList}>
          There are currently no Posts available.
          </Typography>
    );
  }
}

export default withStyles(styles)(ListOfPosts);
