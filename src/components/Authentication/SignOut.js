import React from 'react';

import {authentication} from '../../backend/firebase/index';
import * as routes from "../../constants/routes";

const SignOutButton = () =>
    <button
        className="item"
        type="button"
        onClick={authentication.doSignOut}
    >
        Sign Out
    </button>

export default SignOutButton;