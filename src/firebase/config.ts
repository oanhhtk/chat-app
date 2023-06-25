import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcFOQYwZoDjD_aK9aKZYd-WMV0wRdnioQ",
  authDomain: "chat-app-30a04.firebaseapp.com",
  projectId: "chat-app-30a04",
  storageBucket: "chat-app-30a04.appspot.com",
  messagingSenderId: "276884369045",
  appId: "1:276884369045:web:1f7ea9b4d7a4000d1f759c",
  measurementId: "G-6EXTRVZW4P",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
export default firebase;
