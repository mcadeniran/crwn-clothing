import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA_vrnm9wUzhwjk1DWX3QJ6ui988zA1xn8",
  authDomain: "crwn-db-107fb.firebaseapp.com",
  databaseURL: "https://crwn-db-107fb.firebaseio.com",
  projectId: "crwn-db-107fb",
  storageBucket: "crwn-db-107fb.appspot.com",
  messagingSenderId: "725441759829",
  appId: "1:725441759829:web:236211b8cb81b2738822dc",
  measurementId: "G-5QQQGT1R19",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
