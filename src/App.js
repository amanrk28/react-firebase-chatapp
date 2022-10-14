import React from "react";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import logoutIcon from "./logout.png";
import { ChatRoom } from "./components/ChatRoom";
import { auth } from "./firebase";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <h1><img src="/chat.png" alt="BasChat" /> Chat Away</h1>
        {user && <SignOut />}
      </header>
      <section>{auth.currentUser ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  const signInWithFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <GoogleLoginButton align="center" iconSize="32px" onClick={signInWithGoogle} style={{ maxWidth: 350, margin: '8px auto' }} />
      <FacebookLoginButton align="center" onClick={signInWithFacebook} style={{ maxWidth: 350, margin: 'px auto' }} />
    </div>
  );
}

function SignOut() {
  return (
    <button
      onClick={() => auth.signOut()}
      className="signOut-btn"
      title="Sign Out"
    >
      <img src={logoutIcon} alt="Sign Out" />
    </button>
  );
}

export default App;
