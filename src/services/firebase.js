
import firebase from 'firebase/app';

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDofwVXKuxs_DhPZ4VfFhkdqSYautAKhlk",
  authDomain: "my-checker-37fb4.firebaseapp.com",
  databaseURL: "https://my-checker-37fb4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-checker-37fb4",
  storageBucket: "my-checker-37fb4.appspot.com",
  messagingSenderId: "185015142544",
  appId: "1:185015142544:web:60900a80da0e3e460b3015"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;

export const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};
