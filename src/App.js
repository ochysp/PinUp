// @flow

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import Home from "./components/Home";
import MyPins from "./components/MyPins";
import MyPosts from "./components/MyPosts";

import type { User } from "./api";

//nur wegen flow
type State = {
  isAuthenticated: boolean,
  token: ?string,
  user: ?User
}

export default class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");
    if (token && user) {
      this.state = {
        isAuthenticated: true,
        token,
        user: JSON.parse(user)
      };
    } else {
      this.state = {
        isAuthenticated: false,
        token: undefined,
        user: undefined
      };
    }
  }

  render() {
    const MenuBar = withRouter(({ history, location: { pathname } }) => {
     // if (isAuthenticated && user) {
      return (
          <div className="ui menu">
            <span>User</span>
            {/* Links inside the App are created using the react-router's Link component */}
            <Link className="item" to="/">Home</Link>
            <Link className="item" to="/myPins">My Pins</Link>
            <Link className="item" to="/myPosts">My Posts</Link>
            <div className="ui orange inverted right menu">
              <a className="item" href="/logout"
                 onClick={event => {
                  event.preventDefault();
                  this.signout(() => history.push("/"));
                }}
              >
                Logout User
              </a>
            </div>
          </div>
        );
    });

    return (
      <Router>
        <div>
          <MenuBar />
          <Route
            exact
            path="/"
            render={props => (
              <Home {...props} />
            )}
          />
          <Route
            exact
            path="/myPins"
            render={props => (
              <MyPins {...props} />
            )}
          />
          <Route
            exact
            path="/myPosts"
            render={props => (
              <MyPosts {...props} />
            )}
          />

        </div>
      </Router>
    );
  }
}