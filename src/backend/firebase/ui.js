// Import FirebaseAuth and firebase.
import firebase from 'firebase';

// Configure FirebaseUI.
export default {
    credentialHelper: "none",
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
}
