/* eslint-disable react/prop-types */
// @flow

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from './Home';
import MyPins from './MyPins';
import MyPosts from './MyPosts';
import SignIn from './Authentication/SignInScreen';
import * as routes from '../constants/routes';
import type { AuthUserType } from '../business/Types';

type Props = {
  authUser: ?AuthUserType
};

const Main = (props: Props) => (
  <main>
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


export default Main;

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
