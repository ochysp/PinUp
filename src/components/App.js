// @flow

//React
import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    withRouter,
    Redirect,
} from "react-router-dom";

import {firebase} from '../firebase';

import Home from "./Home";
import MyPins from "./MyPins";
import MyPosts from "./MyPosts";
import SignIn from "./SignIn";
import MenuBar from "./MenuBar";

import * as routes from '../constants/routes';

//nur wegen flow
type State = {
    authUser: ?any,
}

export default class App extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            authUser: null,
        };
    }


    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState(() => ({authUser}))
                : this.setState(() => ({authUser: null}));
        });
    }


    render() {

        return (
            <Router>
                <div>
                    {!!this.state.authUser && <MenuBar authUser={this.state.authUser}/>}
                    <Route
                        exact
                        path={routes.SIGN_IN}
                        render={(props) => (!!this.state.authUser
                            ? <Redirect to={{
                                pathname: routes.HOME,
                                state: {from: props.location}
                            }}/>
                            : <SignIn {...props} />)}
                    />
                    <PrivateRoute
                        authUser={this.state.authUser}
                        exact
                        path={routes.HOME}
                        component={Home}
                    />
                    <PrivateRoute
                        authUser={this.state.authUser}
                        exact
                        path={routes.PINS}
                        component={MyPins}
                    />
                    <PrivateRoute
                        authUser={this.state.authUser}
                        exact
                        path={routes.POSTS}
                        component={MyPosts}
                    />
                </div>
            </Router>
        );
    }


}

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
