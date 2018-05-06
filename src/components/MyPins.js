// @flow

import React from 'react';
import { Grid, Hidden, IconButton, LinearProgress, Paper, Typography, withStyles } from 'material-ui';
import BackIcon from '@material-ui/icons/ArrowBack';
import ListPins from './Pin/ListPins';
import type { AuthUserType, ConnectionType, KeyType, PinType } from '../business/Types';
import { styles } from '../style/styles';
import { detachAllPinListeners, listenForAllPinsOfUser } from '../business/Pin';
import Match from '../business/Match';
import ListOfPosts from './Post/ListOfPosts';

type Props = {
  authUser: AuthUserType,
  classes: any,
};

type State = {
  pins: PinType[],
  matchIds: KeyType[],
  pinSelected: ?PinType,
  PinsDbReady: boolean,
  PostsDbReady: boolean,
};

class MyPins extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.dbHandles = [];
    this.state = {
      pins: [],
      matchIds: [],
      pinSelected: null,
      PostsDbReady: false,
      PinsDbReady: false,
    };
  }

  componentDidMount() {
    listenForAllPinsOfUser(this.props.authUser.uid, (newData: PinType[]) => {
      this.setState({
        pins: newData,
        PinsDbReady: true,
      });
    });
  }

  componentWillUnmount() {
    detachAllPinListeners();
  }

  setPostsDbReady = () => {
    this.setState({ PostsDbReady: true });
  };

  updateMatchDataListener = () => {
    this.detachListeners();
    this.setState({ PostsDbReady: false }, () => {
      this.dbHandles = Match(
        {
          location: {
            latitude: this.state.pinSelected.area.location.latitude,
            longitude: this.state.pinSelected.area.location.longitude,
          },
          radius: this.state.pinSelected.area.radius,
        },
        this.state.pinSelected.categories,
        this.keyEntered,
        this.keyLeft,
        this.setPostsDbReady,
      );
    });
  };

  dbHandles: ConnectionType[];

  detachListeners = () => {
    this.dbHandles.forEach(handle => handle.detach());
  };

  handleSelect = (pin: PinType) => {
    if (!this.state.pinSelected || pin.pinId !== this.state.pinSelected.pinId) {
      this.detachListeners();
      this.setState({
        pinSelected: pin,
        matchIds: [],
      }, () => {
        this.updateMatchDataListener();
      });
    }
  };

  handleUnselect = () => {
    this.setState({
      pinSelected: null,
      matchIds: [],
    });
  };

  keyEntered = (key: KeyType) => {
    this.setState((prevState: State) => {
      const updatedNearbyPostKeys = prevState.matchIds.slice();
      updatedNearbyPostKeys.push(key);
      return { matchIds: updatedNearbyPostKeys };
    });
  };

  keyLeft = (key: KeyType) => {
    this.setState((prevState) => {
      const updatedNearbyPostKeys = prevState.matchIds.slice();
      updatedNearbyPostKeys.splice(updatedNearbyPostKeys.indexOf(key), 1);
      return { matchIds: updatedNearbyPostKeys };
    });
  };

  render() {
    const PinGrid = (
      <Grid item xs={12} md={6}>
        <Paper className={this.props.classes.paper} elevation={4}>
          <Typography variant="headline" className={this.props.classes.typographyTitle} >
      My Pins
          </Typography>
          {this.state.PinsDbReady
      ?
        <ListPins
          pins={this.state.pins}
          authUser={this.props.authUser}
          onSelect={this.handleSelect}
        />
      :
        <LinearProgress className={this.props.classes.progress} />
    }
        </Paper>
      </Grid>);


    return (
      <div className={this.props.classes.flexContainer}>
        <Grid container spacing={24}>

          {this.state.pinSelected ?
            <Hidden smDown>
              {PinGrid}
            </Hidden>
            : PinGrid
          }

          {this.state.pinSelected &&
          <Grid item xs={12} md={6}>
            <Paper className={this.props.classes.paper} elevation={4}>

              <Typography variant="headline" className={this.props.classes.typographyTitle}>
                <IconButton
                  onClick={this.handleUnselect}
                  className={this.props.classes.backButton}
                  aria-label="Delete"
                >
                  <BackIcon />
                </IconButton>
                Matches for {this.state.pinSelected.title}
              </Typography>
              {this.state.PostsDbReady ?
                <ListOfPosts posts={this.state.matchIds} authUser={this.props.authUser} />
              : <LinearProgress className={this.props.classes.progress} />}
            </Paper>
          </Grid>
          }

        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MyPins);
