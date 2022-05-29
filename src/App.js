import React, { useRef, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./App.css";
import logoutIcon from "./logout.png";
import sendIcon from "./send.png";

firebase.initializeApp({
  apiKey: "AIzaSyDMDc2UIvSqGKekkhgvmKuHCHLtLdfi2S4",
  authDomain: "superchat-ark.firebaseapp.com",
  projectId: "superchat-ark",
  storageBucket: "superchat-ark.appspot.com",
  messagingSenderId: "178161877025",
  appId: "1:178161877025:web:c9f306f58ee942ba846360",
  measurementId: "G-H2F727MM9L",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const messagePlaceholders = [
  "What's on your mind...",
  "Message...",
  "Type Something...",
  "Say something nice...",
];

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

function ChatRoom() {
  const messageEndRef = useRef();

  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue("");
    messageEndRef.current.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={messageEndRef} />
      </main>
      <form onSubmit={sendMessage}>
        <input
          placeholder={
            messagePlaceholders[
              Math.floor(Math.random() * messagePlaceholders.length)
            ]
          }
          autoFocus
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">
          <img src={sendIcon} alt="Send" />
        </button>
      </form>
    </>
  );
}

function ChatMessage({ message }) {
  const { text, uid, photoURL } = message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt={auth.currentUser.displayName} />
      <p>{text}</p>
    </div>
  );
}

export default App;
