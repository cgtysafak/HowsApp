import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcYGMXMFhgAGjtxNQM8U4rIfiESBZXPoA",
  authDomain: "im-application-72479.firebaseapp.com",
  projectId: "im-application-72479",
  storageBucket: "im-application-72479.appspot.com",
  messagingSenderId: "160456488787",
  appId: "1:160456488787:web:8651ffeaa0e2753442d3a6",
  measurementId: "G-PZ3JH9FBG9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);  // parsing the config object and storing it in firebaseApp
const db = firebaseApp.firestore();  // accessing the database
const auth = firebase.auth();  // accessing the authentication
const provider = new firebase.auth.GoogleAuthProvider();  // accessing the google authentication

export { auth, provider };
export default db;

// https://www.youtube.com/watch?v=pUxrDcITyjg we are using this (2:00:00)
// https://www.youtube.com/watch?v=ZwFA3YMfkoc buna da bakicaz
