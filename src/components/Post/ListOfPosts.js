// @flow

import React from 'react';
import { List, Typography, withStyles } from 'material-ui';
import PostListEntry from './PostListEntry';
import type { AuthUserType, KeyType } from '../../business/Types';
import { styles } from '../../style/styles';

type Props = {
  posts: KeyType[],
  authUser: AuthUserType,
  classes: any,
};

const ListOfPosts = (props: Props) => {
  const listItems = props.posts.map(postId => (
    <PostListEntry postId={postId} authUser={props.authUser} key={postId} />
  ));
  return (
    props.posts.length > 0 ?
      <List component="nav">
        {listItems}
      </List>
      : <Typography variant="caption" className={props.classes.typographyEmptyList}>
          There are currently no Posts available.
        </Typography>
  );
};

export default withStyles(styles)(ListOfPosts);
