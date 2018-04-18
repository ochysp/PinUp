// @flow

import React from 'react';
import { firebase } from '../data/firebase';
import { doCreateUser } from '../business/User';
import Header from './Navigation/Header';
import Main from './Main';
import type { AuthUserType } from '../Types';

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
      console.log('auth user changed');
      if (authUser) {
        doCreateUser(
          authUser.uid,
          authUser.displayName,
          authUser.email,
          authUser.photoURL,
        );
        console.log(`to: ${authUser.uid}`);
        this.setState(() => ({ authUser }));
      } else {
        console.log('to null');
        this.setState(() => ({ authUser: null }));
      }
    });
  }

  render() {
    return (
      <div>
        <Header authUser={this.state.authUser} />
        <Main authUser={this.state.authUser} />
      </div>
    );
  }
}
