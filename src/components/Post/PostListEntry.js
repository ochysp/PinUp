// @flow

import React from 'react';
import { Dialog, DialogTitle, ListItem, ListItemText } from 'material-ui';
import { listenForPostData, detachPostListener } from '../../business/Post';
import type { PostType, SnapshotType, KeyType } from '../../business/Types';
import PostDetails from './PostDetails';

type Props = {
  postId: KeyType
};

type State = {
  postData: ?PostType,
  isDetailViewOpen: boolean,
};

// eslint-disable-next-line import/prefer-default-export
export default class PostListEntry extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      postData: null,
      isDetailViewOpen: false,
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
    const newState = { postData: values };
    this.setState(newState);
  };

  handleClickOpen = () => {
    this.setState({
      isDetailViewOpen: true,
    });
  };

  handleClose = () => {
    this.setState({ isDetailViewOpen: false });
  };

  render() {
    return (
      this.state.postData &&
      <ListItem button onClick={this.handleClickOpen}>

        <ListItemText primary={this.state.postData.title} />
        <div>
          <Dialog
            open={this.state.isDetailViewOpen}
            onClose={this.handleClose}
            aria-labelledby="simple-dialog-title"
          >
            <DialogTitle id="simple-dialog-title">{this.state.postData.title}</DialogTitle>
            <PostDetails postData={this.state.postData} />
          </Dialog>
        </div>
      </ListItem>
    );
  }
}

