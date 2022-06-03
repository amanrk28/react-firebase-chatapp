import React, { useRef, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ChatMessage } from "../ChatMessage";
import { firestore, auth } from "../../firebase";
import sendIcon from "./send.png";
import "./ChatRoom.css";

const messagePlaceholders = [
  "What's on your mind...",
  "Message...",
  "Type Something...",
  "Say something nice...",
];

export function ChatRoom() {
  const messageEndRef = useRef();

  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(100);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (formValue === "") return;
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
      <div className="input-container">
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
      </div>
    </>
  );
}
