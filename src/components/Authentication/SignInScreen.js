// @flow

import React from 'react';
import { withRouter } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiConfig, firebase } from '../../data/firebase';

const divStyle = {
  display: 'block',
  maxWidth: '500px',
  margin: 'auto',
};

const imgStyle = {
  width: '100%',
  marginTop: '50px',
  marginBottom: '30px',
};

const SignInScreen = () => (
  <div style={divStyle}>
    <img src="/img/PinUp_logo_full_horizontal.png" alt="Pin Up" style={imgStyle} />
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth} />
  </div>
);

export default withRouter(SignInScreen);
