import { useState } from "react";
import axios from "axios";

export default function AIPlayground() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const res = await axios.post("/api/ai", { message: input });
    setResponse(res.data.reply);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Playground</h1>
      <textarea value={input} onChange={e => setInput(e.target.value)} className="w-full border p-2" rows={4}></textarea>
      <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 mt-2">Send</button>
      <div className="mt-4 p-2 border">{response}</div>
    </div>
  );
}

