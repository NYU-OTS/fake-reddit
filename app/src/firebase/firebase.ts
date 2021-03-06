import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCLm2nnVI-ZOX_09kWDY2nLs8zwnws7iz4",
  authDomain: "not-fake-reddit-at-all.firebaseapp.com",
  databaseURL: "https://not-fake-reddit-at-all.firebaseio.com",
  messagingSenderId: "119898869079",
  projectId: "not-fake-reddit-at-all",
  storageBucket: "not-fake-reddit-at-all.appspot.com",
};
firebase.initializeApp(config);

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.database();
