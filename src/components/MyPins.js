// @flow

import React from 'react';
import { Route } from 'react-router-dom';
import * as routes from '../constants/routes';
import ListPins from './Pin/ListPins';
import PinDetails from './Pin/PinDetails';
import type { AuthUserType } from '../Types';

type Props = {
  authUser: AuthUserType
};

const MyPins = (props: Props) => (
  <div>
    <Route
      exact
      path={routes.PINS}
      render={innerProps => (
        <ListPins {...innerProps} authUser={props.authUser} />
      )}
    />
    <Route path={`${routes.PINS}/:pinId`} component={PinDetails} />
  </div>
);

export default MyPins;
