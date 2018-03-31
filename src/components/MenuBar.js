// @flow

import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import * as routes from '../constants/routes';

import SignOutButton from './SignOut';

type Props = {
    authUser: ?any,
};

const MenuBar = (props: Props) => {
    return (
    <div>
        {!!props.authUser
            ? <MenuAuth authUser/>
            : <MenuNonAuth/>
        }
    </div>
    )
};

const MenuAuth = withRouter(({history, location: {pathname}}) => {
    // if (isAuthenticated && user) {
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
    );
});


const MenuNonAuth = withRouter(({history, location: {pathname}}) => {
    // if (isAuthenticated && user) {
    return (
        <div className="ui menu">
            <span>no User</span>
        </div>
    );
});

export default MenuBar;