// @flow

import React from 'react';
import { authentication } from '../../data/firebase/index';

const SignOutButton = () => (
  <button className="item" type="button" onClick={authentication.doSignOut}>
    Sign Out
  </button>
);

export default SignOutButton;
