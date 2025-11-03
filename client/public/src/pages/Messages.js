import { useEffect, useState } from "react";
import axios from "axios";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/api/messages").then(res => setMessages(res.data));
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      {messages.map(msg => (
        <div key={msg._id} className="border p-2 my-2">
          <p><b>{msg.platform}</b> ({msg.chatId}): {msg.text}</p>
        </div>
      ))}
    </div>
  );
}

