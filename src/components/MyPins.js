// @flow

import React from 'react';
import { Route } from 'react-router-dom';
import { Paper, Typography, withStyles } from 'material-ui';
import * as routes from '../constants/routes';
import ListPins from './Pin/ListPins';
import PinDetails from './Pin/PinDetails';
import type { AuthUserType } from '../business/Types';
import { styles } from '../style/styles';

type Props = {
  authUser: AuthUserType,
  classes: any,
};

const MyPins = (props: Props) => (
  <Paper className={props.classes.paper} elevation={4}>
    <Typography variant="headline" className={props.classes.typographyTitle} >My Pins</Typography>
    <Route
      exact
      path={routes.PINS}
      render={innerProps => (
        <ListPins {...innerProps} authUser={props.authUser} />
      )}
    />
    <Route path={`${routes.PINS}/:pinId`} component={PinDetails} authUser={props.authUser} />
  </Paper>
);

export default withStyles(styles)(MyPins);
