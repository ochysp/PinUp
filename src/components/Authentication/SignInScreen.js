// @flow

import React from 'react';
import { withStyles } from 'material-ui';
import { withRouter } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiConfig, firebase } from '../../data/firebase';
import { styles } from '../../style/styles';

const divStyle = {
  display: 'block',
  maxWidth: '500px',
  margin: 'auto',
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)',
};

const imgStyle = {
  width: '100%',
  marginTop: '50px',
  marginBottom: '30px',
};

type Props = {
  classes: any,
}

const SignInScreen = (props: Props) => (
  <div className={props.classes.loginScreenRoot}>
    <div style={divStyle}>
      <img src="/img/PinUp_logo_full_horizontal.png" alt="Pin Up" style={imgStyle} />
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth} />
    </div>
  </div>
);

export default withRouter(withStyles(styles)(SignInScreen));
