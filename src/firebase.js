import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDMDc2UIvSqGKekkhgvmKuHCHLtLdfi2S4",
  authDomain: "superchat-ark.firebaseapp.com",
  projectId: "superchat-ark",
  storageBucket: "superchat-ark.appspot.com",
  messagingSenderId: "178161877025",
  appId: "1:178161877025:web:c9f306f58ee942ba846360",
  measurementId: "G-H2F727MM9L",
});

const auth = app.auth();
const firestore = app.firestore();

export { auth, firestore };
