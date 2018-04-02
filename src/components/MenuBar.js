// @flow

import React from 'react';
import {Link} from 'react-router-dom';

import * as routes from '../constants/routes';

import SignOutButton from './SignOut';

const MenuBar = () => {
    return (
        <div className="ui menu">
            {/* Links inside the App are created using the react-router's Link component */}
            <Link className="item" to={routes.HOME}>Home</Link>
            <Link className="item" to={routes.PINS}>My Pins</Link>
            <Link className="item" to={routes.POSTS}>My Posts</Link>
            <div className="ui orange inverted right menu">
                <SignOutButton/>
            </div>
        </div>
    )
};

export default MenuBar;