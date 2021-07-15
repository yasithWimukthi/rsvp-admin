import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD5d7r4aCJt9MC446xwCErTdGJHGq6_Y9M",
  authDomain: "lite-packaging.firebaseapp.com",
  databaseURL: "https://lite-packaging.firebaseio.com",
  projectId: "lite-packaging",
  storageBucket: "lite-packaging.appspot.com",
  messagingSenderId: "923179339834",
  appId: "1:923179339834:web:3e5bbf03856d22d7c92503",
  measurementId: "G-1Y2GLBYYQL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
