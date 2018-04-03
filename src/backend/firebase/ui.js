// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as auth from './firebase';
import firebase from 'firebase';

import * as routes from '../../constants/routes';

// Configure FirebaseUI.
const uiConfig = {
    credentialHelper: "none",
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccess: () => false
    },
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],

};

export class SignInScreen extends React.Component {
    render() {
        return (
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth.auth}/>
        );
    }
}