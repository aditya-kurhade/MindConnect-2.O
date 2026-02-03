import { useState } from "react";
import React from "react";
import axios from "axios";
import { FiSend, FiMessageCircle, FiHeart, FiX, FiMinus } from "react-icons/fi";

const AiChatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      role: "ai",
      text: "Hello! I'm your MindConnect AI assistant. I'm here to listen and provide supportive guidance about mental health and wellbeing. How are you feeling today?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const suggestedQuestions = [
    "I'm feeling anxious lately",
    "How can I manage stress?",
    "I'm having trouble sleeping",
    "Tips for staying motivated"
  ];

  // Function to render markdown text
  const renderMarkdown = (text) => {
    if (!text) return null;
    
    // Split by newlines to preserve paragraphs
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Handle bold (**text** or __text__)
      const boldRegex = /\*\*(.+?)\*\*|__(.+?)__/g;
      // Handle bullet points
      const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*');
      
      let parts = [];
      let lastIndex = 0;
      
      // First pass: handle bold
      const boldMatches = [...line.matchAll(boldRegex)];
      
      if (boldMatches.length > 0) {
        boldMatches.forEach((match, i) => {
          const beforeText = line.slice(lastIndex, match.index);
          if (beforeText) parts.push(beforeText);
          parts.push(<strong key={`bold-${lineIndex}-${i}`}>{match[1] || match[2]}</strong>);
          lastIndex = match.index + match[0].length;
        });
        const remainingText = line.slice(lastIndex);
        if (remainingText) parts.push(remainingText);
      } else {
        parts = [line];
      }
      
      // Handle empty lines as line breaks
      if (line.trim() === '') {
        return <br key={`br-${lineIndex}`} />;
      }
      
      // Handle bullet points
      if (isBullet) {
        return (
          <div key={`line-${lineIndex}`} className="flex gap-2 ml-2">
            <span>•</span>
            <span>{parts}</span>
          </div>
        );
      }
      
      return <div key={`line-${lineIndex}`}>{parts}</div>;
    });
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setChat([...chat, { role: "user", text: userMessage }]);
    setMessage("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", { 
        prompt: `You are a compassionate mental health support assistant. Provide empathetic, supportive, and helpful guidance. User's question: ${userMessage}` 
      });
      
      setIsTyping(false);
      
      if (response.data.success) {
        setChat((prevChat) => [
          ...prevChat,
          { role: "ai", text: response.data.data },
        ]);
      } else {
        setChat((prevChat) => [
          ...prevChat,
          { role: "ai", text: "I'm having trouble connecting right now. Please try again in a moment." },
        ]);
      }
    } catch (error) {
      setIsTyping(false);
      setChat((prevChat) => [
        ...prevChat,
        { role: "ai", text: "I'm experiencing technical difficulties. Please try again or contact a counselor if you need immediate support." },
      ]);
      console.error("sendMessage error:", error);
    } 
  };

  const handleSuggestedQuestion = (question) => {
    setMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 z-50 group"
          aria-label="Open chat"
        >
          <FiMessageCircle className="text-3xl" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            AI
          </span>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
            <div className="bg-gray-800 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
              Chat with Mental Health AI
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 animate-slideUp">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiMessageCircle className="text-2xl" />
              <div>
                <h2 className="text-lg font-bold">Mental Health AI</h2>
                <p className="text-blue-100 text-xs">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1.5 rounded-lg transition"
                aria-label="Minimize chat"
              >
                <FiMinus className="text-xl" />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setChat([{
                    role: "ai",
                    text: "Hello! I'm your MindConnect AI assistant. I'm here to listen and provide supportive guidance about mental health and wellbeing. How are you feeling today?"
                  }]);
                  setMessage("");
                }}
                className="hover:bg-white/20 p-1.5 rounded-lg transition"
                aria-label="Close chat"
              >
                <FiX className="text-xl" />
              </button>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {chat.map((c, i) => (
              <div
                key={i}
                className={`flex ${c.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl shadow-sm
                    ${c.role === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      : "bg-white text-gray-800 border border-gray-200"}`}
                >
                  {c.role === "ai" && (
                    <div className="flex items-center gap-1 mb-1">
                      <FiHeart className="text-purple-500 text-xs" />
                      <span className="text-xs font-semibold text-purple-600">AI</span>
                    </div>
                  )}
                  <div className="text-xs leading-relaxed">
                    {renderMarkdown(c.text)}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-3 py-2 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">Typing...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          {chat.length === 1 && (
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-1.5">Quick topics:</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedQuestion(q)}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs hover:bg-blue-100 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-200 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-2 border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                disabled={!message.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition shadow-md"
              >
                <FiSend className="text-sm" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              💙 AI support • For emergencies call a professional
            </p>
          </div>

        </div>
      )}
    </>
  );
};

export default AiChatbot;
