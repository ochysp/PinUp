// @flow

import React from "react";
import { withRouter } from "react-router-dom";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { uiConfig, firebase } from "../../data/firebase";

const SignInScreen = () => (
  <div>
    <h1>Pin Up</h1>
    <p>Please sign-in:</p>
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth} />
  </div>
);

export default withRouter(SignInScreen);
