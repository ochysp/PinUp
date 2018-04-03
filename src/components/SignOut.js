import React from 'react';

import {authentication} from '../firebase';
import * as routes from "../constants/routes";

const SignOutButton = () =>
    <button
        className="item"
        type="button"
        onClick={authentication.doSignOut}
    >
        Sign Out
    </button>

export default SignOutButton;