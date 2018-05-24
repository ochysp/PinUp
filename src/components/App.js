// @flow

import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, Paper, withStyles } from '@material-ui/core';
import { firebase } from '../data/firebase';
import { doCreateUser } from '../business/User';
import Header from './Navigation/Header';
import Main from './Main';
import type { AuthUserType } from '../business/Types';
import { styles } from '../style/styles';
import style from '../style/styles.css';
import theme from '../style/globalTheme';

type Props = {
  classes: any,
};

type State = {
  authUser: ?AuthUserType
};

class App extends React.Component<Props, State> {
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
      <MuiThemeProvider theme={theme}>
        <Paper className={this.props.classes.masterPaper}>
          <CssBaseline />
          <div className={style} />
          <Header authUser={this.state.authUser} />
          <Main authUser={this.state.authUser} />
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
