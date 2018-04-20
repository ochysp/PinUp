// @flow

import React from 'react';
import { List, withStyles } from 'material-ui';
import PostListEntry from './PostListEntry';
import type { KeyType } from '../../business/Types';

type Props = {
  classes: any,
  posts: KeyType[]
};

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const ListOfPosts = (props: Props) => {
  const listItems = props.posts.map(postId => (
    <PostListEntry postId={postId} />
  ));
  return (
    <div className={props.classes.root}>
      <List component="nav">
        {listItems}
      </List>
    </div>
  );
};

export default withStyles(styles)(ListOfPosts);
