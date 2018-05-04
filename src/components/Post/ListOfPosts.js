// @flow

import React from 'react';
import { List } from 'material-ui';
import PostListEntry from './PostListEntry';
import type { AuthUserType, KeyType } from '../../business/Types';

type Props = {
  posts: KeyType[],
  authUser: AuthUserType
};

const ListOfPosts = (props: Props) => {
  const listItems = props.posts.map(postId => (
    <PostListEntry postId={postId} authUser={props.authUser} key={postId} />
  ));
  return (
    <List component="nav">
      {listItems}
    </List>
  );
};

export default (ListOfPosts);
