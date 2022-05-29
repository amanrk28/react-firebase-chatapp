import React from "react";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import logoutIcon from "./logout.png";
import { ChatRoom } from "./components/ChatRoom";
import { auth } from "./firebase";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <h1>💬 Chat Away</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <button className="signIn-btn" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button
        onClick={() => auth.signOut()}
        className="signOut-btn"
        title="Sign Out"
      >
        <img src={logoutIcon} alt="Sign Out" />
      </button>
    )
  );
}

export default App;
