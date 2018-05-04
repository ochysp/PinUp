// @flow

import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider, Paper, withStyles } from 'material-ui';
import { createMuiTheme } from 'material-ui/styles';
import { firebase } from '../data/firebase';
import { doCreateUser } from '../business/User';
import Header from './Navigation/Header';
import Main from './Main';
import type { AuthUserType } from '../business/Types';
import { styles } from '../style/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#f16254',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contast with palette.primary.main
    },
    secondary: {
      main: '#fbb03b',
    },
  },
});

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
          <Header authUser={this.state.authUser} />
          <Main authUser={this.state.authUser} />
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
