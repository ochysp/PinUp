// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import { styles } from '../../style/styles';
import type { AuthUserType, PostType } from '../../business/Types';
import { listenForPostData, detachPostListener } from '../../business/Post';
import { CATEGORIES } from '../../constants/categories';
import PostDetails from './PostDetails';

type Props = {
  postId: KeyType,
  authUser: AuthUserType,
  classes: any,
  expanded: boolean,
  handleChange: (panel: string) => void,
};

type State = {
  postData: ?PostType,
  loading: boolean,
};

class PostListEntry extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      postData: null,
      loading: true,
    };
  }

  componentDidMount() {
    listenForPostData(this.props.postId,
      (post: PostType) => {
        this.updateData(post);
      });
  }

  componentWillUnmount() {
    detachPostListener(this.props.postId);
  }

  updateData = (values: PostType) => {
    const newState = { postData: values, loading: false };
    this.setState(newState);
  };

  render() {
    const { expanded } = this.props;

    return (
      <ExpansionPanel
        elevation={4}
        expanded={expanded === this.props.postId}
        onChange={this.props.handleChange(this.props.postId)}
      >
        <ExpansionPanelSummary
          expandIcon={this.state.loading
            ? <CircularProgress className={this.props.classes.circularProgress} />
            : <ExpandMoreIcon />
          }
        >
          <Grid container spacing={24}>
            <Grid item xs={12} sm={8}>
              <Typography variant="subheading">
                {this.state.postData ? this.state.postData.title : ''}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subheading" color="textSecondary">
                {this.state.postData ? CATEGORIES[this.state.postData.category] : ''}
              </Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        {this.state.postData &&
          <PostDetails
            postData={this.state.postData}
            authUser={this.props.authUser}
            onCloseClicked={this.handleClose}
          />
          }
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(PostListEntry);

