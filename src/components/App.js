// @flow

//React
import React from "react";

import {firebase} from '../firebase';
import {db} from '../firebase';
import {Header} from "./Header";
import {Main} from "./Main";

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
            if (authUser) {
                this.setState(() => ({authUser}));
                db.doCreateUser(authUser.uid, authUser.displayName, authUser.email, authUser.photoURL)
            } else {
                this.setState(() => ({authUser: null}))
            }
        });
    }

    render() {
        return (
            <div>
                <Header authUser={this.state.authUser}/>
                <Main authUser={this.state.authUser}/>
            </div>
        );
    }


}


