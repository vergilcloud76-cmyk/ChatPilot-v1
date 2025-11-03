import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/api/messages").then(res => setMessages(res.data));
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Total Messages: {messages.length}</p>
    </div>
  );
}

