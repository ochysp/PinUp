// @flow

import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import MyPins from "./MyPins";
import MyPosts from "./MyPosts";
import SignIn from "./Authentication/SignIn";
import * as routes from "../constants/routes";

type Props = {
  authUser: ?{ uid: string }
};

export class Main extends React.Component<Props> {
  render() {
    return (
      <main>
        <PrivateRoute
          authUser={this.props.authUser}
          exact
          path={routes.HOME}
          component={Home}
        />
        <PrivateRoute
          authUser={this.props.authUser}
          path={routes.PINS}
          component={MyPins}
        />
        <PrivateRoute
          authUser={this.props.authUser}
          path={routes.POSTS}
          component={MyPosts}
        />
        <Route
          exact
          path={routes.SIGN_IN}
          render={props =>
            !!this.props.authUser ? (
              <Redirect to={routes.HOME} />
            ) : (
              <SignIn {...props} />
            )
          }
        />
      </main>
    );
  }
}

function PrivateRoute({ component: Component, authUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !!authUser ? (
          <Component {...rest} {...props} authUser={authUser} />
        ) : (
          <Redirect to={routes.SIGN_IN} />
        )
      }
    />
  );
}
