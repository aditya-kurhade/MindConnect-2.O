import { useState } from "react";
import React from "react";
import axios from "axios";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat([...chat, { role: "user", text: message }]);
    setMessage("");

    try {
      const response = await axios.post("/api/chat", { prompt: message });
      if (response.data.success) {
        setChat((prevChat) => [
          ...prevChat,
          { role: "ai", text: response.data.data },
        ]);
      } else {
        setChat((prevChat) => [
          ...prevChat,
          { role: "ai", text: "AI service is currently unavailable." },
        ]);
      }
    } catch (error) {
      setChat((prevChat) => [
        ...prevChat,
        { role: "ai", text: "Error communicating with AI service." },
      ])
      console.error("sendMessage error:", error);
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-4 flex flex-col">
        
        <h2 className="text-xl font-semibold text-center mb-4">
          AI Chatbot
        </h2>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-2 mb-4">
          {chat.map((c, i) => (
            <div
              key={i}
              className={`max-w-[75%] px-3 py-2 rounded-lg text-sm
                ${c.role === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-200 text-gray-800"}`}
            >
              {c.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chatbot;
