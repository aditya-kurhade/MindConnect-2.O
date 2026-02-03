import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiSend, FiUploadCloud, FiFileText, FiTag, FiX } from "react-icons/fi";

const RAGChatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");
  const [selectedTag, setSelectedTag] = useState("general");
  const [filterTag, setFilterTag] = useState("all");
  const [redactEnabled, setRedactEnabled] = useState(true);
  const [sourcePreview, setSourcePreview] = useState(null);

  const quickPrompts = [
    "Risk assessment summary",
    "Coping strategies",
    "Session recap"
  ];

  const sessionTags = ["general", "anxiety", "sleep", "mood"];

  const redactSensitive = (text) => {
    if (!text) return text;
    let redacted = text;
    redacted = redacted.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted email]");
    redacted = redacted.replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[redacted id]");
    redacted = redacted.replace(/(\+?\d[\d\s().-]{7,}\d)/g, "[redacted phone]");
    return redacted;
  };

  const computeConfidence = (answer, sources = []) => {
    const length = (answer || "").length;
    if (sources.length >= 2 && length > 200) return "high";
    if (sources.length >= 1 && length > 80) return "medium";
    return "low";
  };

  const handlePrompt = (prompt) => {
    setMessage(prompt);
  };

  const isUrl = (value) => /^https?:\/\//i.test(value || "");

  const getLatestSources = () => {
    for (let i = chat.length - 1; i >= 0; i -= 1) {
      if (chat[i]?.sources?.length) return chat[i].sources;
    }
    return [];
  };

  // Send user message
  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    const tagToUse = selectedTag || "general";
    const safeMessage = redactEnabled ? redactSensitive(userMessage) : userMessage;

    setChat([...chat, { role: "user", text: userMessage, tag: tagToUse }]);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/rag-chat", {
        query: safeMessage,
        tag: tagToUse,
        redacted: redactEnabled,
      });
      if (response.data.success) {
        const confidence = computeConfidence(response.data.data, response.data.sources);
        setChat((prevChat) => [
          ...prevChat,
          { role: "ai", text: response.data.data, sources: response.data.sources, tag: tagToUse, confidence },
        ]);
      } else {
        setChat((prevChat) => [
          ...prevChat,
          { role: "ai", text: "AI service is currently unavailable.", tag: tagToUse, confidence: "low" },
        ]);
      }
    } catch (error) {
      console.error(error);
      setChat((prevChat) => [
        ...prevChat,
        { role: "ai", text: "Error communicating with AI service.", tag: tagToUse, confidence: "low" },
      ]);
    }
  };

  // Upload PDF
  const uploadPDF = async () => {
    if (!file) {
      setUploadStatus("error");
      setUploadMessage("Select a PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("query", redactEnabled ? redactSensitive(message) : message);
    formData.append("pdf", file);
    setUploadStatus("uploading");
    setUploadProgress(0);
    setUploadMessage("Uploading PDF...");

    try {
      const response = await axios.post("http://localhost:5000/api/upload-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || 1;
          const percent = Math.round((progressEvent.loaded * 100) / total);
          setUploadProgress(percent);
        },
      });

      if (response.data.success) {
        setUploadStatus("success");
        setUploadMessage("Upload complete. You can start asking questions.");
        setFile(null);
      } else {
        setUploadStatus("error");
        setUploadMessage("Upload failed: " + response.data.error);
      }
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      setUploadStatus("error");
      setUploadMessage("Upload failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <FiArrowLeft />
            Back to Home
          </Link>
          <span className="text-sm text-gray-500">MindConnect • Counselor Assistant</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Upload panel */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <FiFileText />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Client Document Hub</h3>
                <p className="text-sm text-gray-500">Upload a case note, report, or resource PDF</p>
              </div>
            </div>

            <div className="border-2 border-dashed border-blue-200 rounded-xl p-4 bg-blue-50">
              <div className="text-xs font-medium text-gray-600 mb-2">Select PDF</div>
              <input
                id="rag-pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
              <label
                htmlFor="rag-pdf-upload"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-100 cursor-pointer text-sm"
              >
                <FiFileText />
                {file ? "Change PDF" : "Choose PDF"}
              </label>
              <div className="mt-3 text-sm text-gray-700">
                {file ? (
                  <>
                    Selected: <span className="font-medium">{file.name}</span>
                  </>
                ) : (
                  <span className="text-gray-500">No file selected</span>
                )}
              </div>
              <button
                onClick={uploadPDF}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                <FiUploadCloud />
                Upload to Session Context
              </button>
              {uploadStatus !== "idle" && (
                <div className="mt-3">
                  <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                    <div
                      className={`h-full ${uploadStatus === "error" ? "bg-red-500" : "bg-blue-500"}`}
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <div
                    className={`text-xs mt-2 ${uploadStatus === "error" ? "text-red-600" : "text-gray-600"}`}
                  >
                    {uploadMessage}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 text-xs text-gray-500 leading-relaxed">
              Tip: Upload a client plan, assessment, or resource guide. Then ask questions to get evidence‑based answers with citations.
            </div>

            <div className="mt-4 text-xs text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={redactEnabled}
                  onChange={(e) => setRedactEnabled(e.target.checked)}
                />
                Auto‑redact sensitive text
              </label>
              <div className="mt-2 text-[11px] text-gray-500">
                Note: Redaction applies to text queries; PDFs are uploaded as‑is.
              </div>
            </div>
          </div>

          {/* Right: Chat panel */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold">Counselor Knowledge Chat</h2>
                <p className="text-sm text-gray-500">Ask questions based on the uploaded client documents</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">Contextual AI</span>
            </div>

            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-xs text-gray-500">Quick prompts:</span>
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePrompt(prompt)}
                  className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-xs text-gray-500">Tag this question:</span>
              {sessionTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`text-xs px-2 py-1 rounded-full border ${
                    selectedTag === tag
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    <FiTag className="text-[10px]" /> {tag}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-xs text-gray-500">Filter:</span>
              <button
                onClick={() => setFilterTag("all")}
                className={`text-xs px-2 py-1 rounded-full border ${
                  filterTag === "all"
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                All
              </button>
              {sessionTags.map((tag) => (
                <button
                  key={`filter-${tag}`}
                  onClick={() => setFilterTag(tag)}
                  className={`text-xs px-2 py-1 rounded-full border ${
                    filterTag === tag
                      ? "bg-gray-800 text-white border-gray-800"
                      : "bg-white text-gray-600 border-gray-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => {
                  const latest = getLatestSources();
                  setSourcePreview(latest.length ? latest : "No sources available yet.");
                }}
                className="text-xs px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
              >
                Review sources
              </button>
              <span className="text-[11px] text-gray-500">Opens the most recent sources</span>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 h-96 border p-3 rounded-xl bg-gray-50">
              {(filterTag === "all" ? chat : chat.filter((c) => c.tag === filterTag)).map((c, i) => (
                <div
                  key={i}
                  className={`max-w-[75%] px-3 py-2 rounded-lg text-sm
                    ${c.role === "user" ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-gray-200 text-gray-800"}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-wide opacity-70">{c.tag || "general"}</span>
                    {c.role === "ai" && c.confidence && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          c.confidence === "high"
                            ? "bg-green-100 text-green-700"
                            : c.confidence === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {c.confidence}
                      </span>
                    )}
                  </div>
                  {c.text}
                  {c.sources && (
                    <div className="text-xs mt-2 text-gray-600 flex flex-wrap gap-2">
                      {c.sources.map((source, idx) => (
                        <button
                          key={`${i}-src-${idx}`}
                          onClick={() => setSourcePreview(source)}
                          className="px-2 py-1 rounded-full bg-white border border-gray-300 hover:bg-gray-100"
                        >
                          {source}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {sourcePreview && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between px-4 py-3 border-b">
                    <span className="text-sm font-semibold text-gray-800">Source preview</span>
                    <button
                      onClick={() => setSourcePreview(null)}
                      className="text-gray-500 hover:text-gray-700"
                      aria-label="Close preview"
                    >
                      <FiX />
                    </button>
                  </div>

                  <div className="p-4 overflow-auto">
                    {Array.isArray(sourcePreview) ? (
                      <div className="text-xs text-gray-700 break-words flex flex-wrap gap-2">
                        {sourcePreview.map((src, idx) => (
                          <button
                            key={`preview-${idx}`}
                            onClick={() => setSourcePreview(src)}
                            className="px-2 py-1 rounded-full bg-white border border-gray-300 hover:bg-gray-100"
                          >
                            {src}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div className="text-xs text-gray-700 break-words mb-3">
                          {sourcePreview}
                        </div>
                        {isUrl(sourcePreview) && (
                          <>
                            <div className="border rounded-lg overflow-hidden mb-3">
                              <iframe
                                title="Source preview"
                                src={sourcePreview}
                                className="w-full h-64"
                              />
                            </div>
                            <a
                              href={sourcePreview}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-700"
                            >
                              Open source in new tab
                            </a>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Input and send */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Ask about the client plan, symptoms, or recommended next steps..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 inline-flex items-center gap-2"
              >
                <FiSend />
                Send
              </button>
            </div>

            <div className="text-xs text-gray-400">
              For counselors only. Ensure uploaded files are authorized and privacy‑compliant.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RAGChatbot;
