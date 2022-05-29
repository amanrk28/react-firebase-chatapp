import { auth } from "../../firebase";
import "./ChatMessage.css";

export function ChatMessage({ message }) {
  const { text, uid, photoURL } = message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt={auth.currentUser.displayName} />
      <p className="messageText">{text}</p>
    </div>
  );
}
