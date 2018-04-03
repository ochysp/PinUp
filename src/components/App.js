// @flow

//React
import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {firebase} from '../firebase';
import {db} from '../firebase';
import {Header} from "./Header";
import {Main} from "./Main";

//nur wegen flow
type State = {
    authUser: ?{ uid: string },
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
            console.log('auth user changed');
            if (authUser) {
                db.doCreateUser(authUser.uid, authUser.displayName, authUser.email, authUser.photoURL);
                console.log('to: ' + authUser.uid);
                this.setState(() => ({authUser: authUser}));
            } else {
                console.log('to null');
                this.setState(() => ({authUser: null}))
            }
        });
    }

    render() {
        return (
            <MuiThemeProvider>
                <Header authUser={this.state.authUser}/>
                <Main authUser={this.state.authUser}/>
            </MuiThemeProvider>
        );
    }


}


