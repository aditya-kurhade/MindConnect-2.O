import React, { useState } from "react";
import axios from "axios";

const RAGChatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [file, setFile] = useState(null);

  // Send user message
  const sendMessage = async () => {
    if (!message.trim()) return;

    setChat([...chat, { role: "user", text: message }]);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/rag-chat", { query: message });
      if (response.data.success) {
        setChat((prevChat) => [
          ...prevChat,
          { role: "ai", text: response.data.data, sources: response.data.sources },
        ]);
      } else {
        setChat((prevChat) => [
          ...prevChat,
          { role: "ai", text: "AI service is currently unavailable." },
        ]);
      }
    } catch (error) {
      console.error(error);
      setChat((prevChat) => [
        ...prevChat,
        { role: "ai", text: "Error communicating with AI service." },
      ]);
    }
  };

  // Upload PDF
  const uploadPDF = async () => {
  if (!file) return alert("Select a PDF first");

  const formData = new FormData();
  formData.append("query", message);
  formData.append("pdf", file);
  console.log("Uploading file:", formData);

  try {
    const response = await axios.post("http://localhost:5000/api/upload-pdf", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.success) {
      alert("PDF uploaded successfully!");
      console.log("Upload response:", response.data);
      setFile(null);
    } else {
      alert("Upload failed: " + response.data.error);
    }
  } catch (err) {
    console.error("Upload error:", err.response?.data || err.message);
    alert("Upload failed: " + (err.response?.data?.error || err.message));
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-semibold text-center mb-4">RAG Chatbot</h2>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-2 mb-4 h-96 border p-2 rounded-lg bg-gray-50">
          {chat.map((c, i) => (
            <div
              key={i}
              className={`max-w-[75%] px-3 py-2 rounded-lg text-sm
                ${c.role === "user" ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-gray-200 text-gray-800"}`}
            >
              {c.text}
              {c.sources && (
                <div className="text-xs mt-1 text-gray-600">
                  Sources: {c.sources.join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input and send */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Type a question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>

        {/* PDF upload */}
        <div className="flex gap-2 items-center">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="border rounded-lg px-3 py-2 text-sm"
          />
          <button
            onClick={uploadPDF}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Upload PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default RAGChatbot;
