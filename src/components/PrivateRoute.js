import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component, isAuthenticated, user, token, ...rest }) {
  if (isAuthenticated) {
    // if the user is authenticated, just render the component
    return (
      <Route
        {...rest}
        render={props =>
          React.createElement(component, { ...props, user, token })
        }
      />
    );
  } else {
    // otherwise redirect to the login page
    return (
      <Route
        {...rest}
        render={props => (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )}
      />
    );
  }
}

export default PrivateRoute;
