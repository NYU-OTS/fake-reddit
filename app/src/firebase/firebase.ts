import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCy7rSV9Fak3LhTrI5cdHn6gAgzVqaVREA",
  authDomain: "test-599ea.firebaseapp.com",
  databaseURL: "https://test-599ea.firebaseio.com",
  projectId: "test-599ea",
  storageBucket: "test-599ea.appspot.com",
  // tslint:disable-next-line:object-literal-sort-keys
  messagingSenderId: "505895138785"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.database();
