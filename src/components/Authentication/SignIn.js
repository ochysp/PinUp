import React from 'react';
import {withRouter} from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {uiConfig, firebase} from "../../backend/firebase";

class SignInScreen extends React.Component {
    render() {
        return (
            <div>
                <h1>My App</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth}/>
            </div>
        );
    }
}

export default withRouter(SignInScreen);