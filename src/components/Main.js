/* eslint-disable react/prop-types */
// @flow

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withStyles } from 'material-ui';
import Home from './Home';
import MyPins from './MyPins';
import MyPosts from './MyPosts';
import SignIn from './Authentication/SignInScreen';
import * as routes from '../constants/routes';
import type { AuthUserType } from '../business/Types';
import { styles } from '../style/styles';

type Props = {
  authUser: ?AuthUserType,
  classes: any,
};

const Main = (props: Props) => (
  <main className={props.classes.main} >
    <PrivateRoute
      authUser={props.authUser}
      exact
      path={routes.HOME}
      component={Home}
    />
    <PrivateRoute
      authUser={props.authUser}
      path={routes.PINS}
      component={MyPins}
    />
    <PrivateRoute
      authUser={props.authUser}
      path={routes.POSTS}
      component={MyPosts}
    />
    <Route
      exact
      path={routes.SIGN_IN}
      render={innerProps =>
            (props.authUser ? (
              <Redirect to={routes.HOME} />
            ) : (
              <SignIn {...innerProps} />
            ))}
    />
  </main>
);


export default withStyles(styles)(Main);

function PrivateRoute({ component: Component, authUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        (authUser ? (
          <Component {...rest} {...props} authUser={authUser} />
        ) : (
          <Redirect to={routes.SIGN_IN} />
        ))
      }
    />
  );
}
