// @flow

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from "./Home";
import MyPins from "./MyPins";
import MyPosts from "./MyPosts";
import SignIn from "./SignIn";
import * as routes from "../constants/routes";

type Props = {
    authUser: ?any,
}

export const Main = (props: Props) => (
    <main>
        <Switch>
            <Route
                path={routes.SIGN_IN}
                render={(props) => (!!props.authUser
                    ? <Redirect to={{
                        pathname: routes.HOME,
                        state: {from: props.location}
                    }}/>
                    : <SignIn {...props} />)}
            />
            <PrivateRoute
                authUser={props.authUser}
                exact
                path={routes.HOME}
                component={Home}
            />
            <PrivateRoute
                authUser={props.authUser}
                path={routes.PINS}
                component={MyPins}
            />
            <PrivateRoute
                authUser={props.authUser}
                path={routes.POSTS}
                component={MyPosts}
            />
        </Switch>
    </main>
);

function PrivateRoute({component: Component, authUser, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => !!authUser
                ? <Component {...rest} {...props} />
                : <Redirect to={{
                    pathname: routes.SIGN_IN,
                    state: {from: props.location}
                }}/>}
        />
    )
}