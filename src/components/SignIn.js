import React from 'react';
import { withRouter } from 'react-router-dom';
import { ui } from '../firebase';

class SignInScreen extends React.Component {
    render() {
        return (
            <div>
                <h1>My App</h1>
                <p>Please sign-in:</p>
                <ui.SignInScreen/>
            </div>
        );
    }
}

export default withRouter(SignInScreen);