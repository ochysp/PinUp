// @flow

import React from 'react';
import { withRouter } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { uiConfig, firebase } from '../../data/firebase';

const SignInScreen = () => (
  <div>
    <h1 className="signInTitle">Pin Up</h1>
    <img src="/public/img/PinUp_logo_full_horizontal.png" alt="Pin Up" />
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth} />
  </div>
);

export default withRouter(SignInScreen);
