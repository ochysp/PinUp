// @flow

import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { firebase } from '../data/firebase';
import { doCreateUser } from '../business/User';
import Header from './Navigation/Header';
import Main from './Main';
import type { AuthUserType } from '../business/Types';

type State = {
  authUser: ?AuthUserType
};

export default class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser: AuthUserType) => {
      if (authUser) {
        doCreateUser(
          authUser.uid,
          authUser.displayName,
          authUser.email,
          authUser.photoURL,
        );
        this.setState(() => ({ authUser }));
      } else {
        this.setState(() => ({ authUser: null }));
      }
    });
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <Header authUser={this.state.authUser} />
        <Main authUser={this.state.authUser} />
      </div>
    );
  }
}
