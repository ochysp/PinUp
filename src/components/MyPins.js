// @flow

import React from 'react';
import { Grid, Paper, Typography, withStyles } from 'material-ui';
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
};

class MyPins extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.dbHandles = [];
    this.state = {
      pins: [],
      matchIds: [],
      pinSelected: null,
    };
  }

  componentDidMount() {
    listenForAllPinsOfUser(this.props.authUser.uid, (newData: PinType[]) => {
      this.setState({ pins: newData });
    });
  }

  componentWillUnmount() {
    detachAllPinListeners();
  }

  updateDataListener = () => {
    this.detachListeners();
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
    );
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
        this.updateDataListener();
      });
    }
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
    return (
      <div className={this.props.classes.flexContainer}>
        <Grid container spacing={24}>

          <Grid item xs={12} md={6}>
            <Paper className={this.props.classes.paper} elevation={4}>
              <Typography variant="headline" className={this.props.classes.typographyTitle} >
                My Pins
              </Typography>
              <ListPins
                pins={this.state.pins}
                authUser={this.props.authUser}
                onSelect={this.handleSelect}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className={this.props.classes.paper} elevation={4}>
              <Typography variant="headline" className={this.props.classes.typographyTitle} >
                <ListOfPosts posts={this.state.matchIds} authUser={this.props.authUser} />
              </Typography>
            </Paper>
          </Grid>

        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MyPins);
