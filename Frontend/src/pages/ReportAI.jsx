import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiUploadCloud, FiFileText, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Navbar from "../components/Navbar";

const ReportAI = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  // Validate file
  const validateAndSetFile = (selectedFile) => {
    const validTypes = ["audio/mpeg", "audio/wav", "audio/mp3", "audio/m4a", "audio/ogg"];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(mp3|wav|m4a|ogg)$/i)) {
      setError("Invalid file type. Please upload an audio file (MP3, WAV, M4A, OGG).");
      return;
    }

    if (selectedFile.size > maxSize) {
      setError("File size exceeds 50MB limit.");
      return;
    }

    setFile(selectedFile);
    setError("");
    setInsights(null);
  };

  // Process the audio file
  const handleProcess = async () => {
    if (!file) return;

    setProcessing(true);
    setError("");

    try {
      // Simulate AI processing (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock insights data
      const mockInsights = {
        summary: "The session focused on client's work-related stress and anxiety management strategies. Progress noted in implementing breathing techniques and setting workplace boundaries.",
        keyTopics: [
          "Work-life balance",
          "Anxiety management",
          "Breathing techniques",
          "Workplace boundaries",
          "Stress triggers"
        ],
        emotionalSignals: [
          {
            emotion: "Anxiety",
            level: "Moderate",
            context: "Discussion about upcoming project deadlines"
          },
          {
            emotion: "Hope",
            level: "High",
            context: "When discussing progress with coping strategies"
          },
          {
            emotion: "Frustration",
            level: "Low",
            context: "Regarding communication with supervisor"
          }
        ],
        actionItems: [
          "Practice daily 5-minute breathing exercises before work meetings",
          "Continue maintaining work hours boundary (no emails after 7 PM)",
          "Schedule follow-up session to review progress in 2 weeks",
          "Consider discussing workload with supervisor using prepared script"
        ],
        riskAssessment: "Low - Client shows good engagement and positive coping strategies",
        sessionMetadata: {
          duration: "45 minutes",
          date: new Date().toLocaleDateString(),
          clientEngagement: "High"
        }
      };

      setInsights(mockInsights);
    } catch (err) {
      setError("Failed to process the audio file. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFile(null);
    setInsights(null);
    setError("");
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8 mt-16">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            AI Session Insight Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your counselling session recording to generate structured insights,
            emotional analysis, and actionable recommendations.
          </p>
        </div>

        {/* Upload Section */}
        {!insights && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <FiUploadCloud className="mx-auto text-6xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {file ? file.name : "Upload Session Recording"}
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your audio file here, or click to browse
              </p>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="audio/*"
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileInput"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition"
              >
                Choose File
              </label>
              <p className="text-sm text-gray-500 mt-4">
                Supported formats: MP3, WAV, M4A, OGG (Max 50MB)
              </p>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <FiAlertCircle className="text-xl flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {file && !error && (
              <div className="mt-6 flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="text-2xl text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-600">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Remove
                  </button>
                  <button
                    onClick={handleProcess}
                    disabled={processing}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {processing ? (
                      <>
                        <AiOutlineLoading3Quarters className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Generate Insights"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Processing State */}
        {processing && (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <AiOutlineLoading3Quarters className="mx-auto text-6xl text-blue-500 animate-spin mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Analyzing Session Recording
            </h3>
            <p className="text-gray-600">
              Our AI is processing the audio and generating insights. This usually takes 2-3 minutes...
            </p>
          </div>
        )}

        {/* Insights Display */}
        {insights && !processing && (
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Session Insights</h2>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  New Analysis
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                  Export Report
                </button>
              </div>
            </div>

            {/* Session Metadata */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Session Date</p>
                  <p className="font-semibold text-gray-900">{insights.sessionMetadata.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold text-gray-900">{insights.sessionMetadata.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Client Engagement</p>
                  <p className="font-semibold text-green-600">{insights.sessionMetadata.clientEngagement}</p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiFileText className="text-blue-600" />
                Session Summary
              </h3>
              <p className="text-gray-700 leading-relaxed">{insights.summary}</p>
            </div>

            {/* Key Topics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Topics Discussed</h3>
              <div className="flex flex-wrap gap-2">
                {insights.keyTopics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Emotional Signals */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Emotional Signals</h3>
              <div className="space-y-4">
                {insights.emotionalSignals.map((signal, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-gray-900">{signal.emotion}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          signal.level === "High"
                            ? "bg-red-100 text-red-700"
                            : signal.level === "Moderate"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {signal.level}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{signal.context}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Action Items</h3>
              <ul className="space-y-3">
                {insights.actionItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FiCheckCircle className="text-green-600 text-xl flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk Assessment */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Risk Assessment</h3>
              <p className="text-gray-700">{insights.riskAssessment}</p>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <p className="text-sm text-gray-700">
                <strong>Important:</strong> These AI-generated insights are meant to assist counsellors
                and should not replace professional judgment. Always review and verify the analysis
                before using it in clinical documentation or decision-making.
              </p>
            </div>
          </div>
        )}

        {/* Info Section */}
        {!insights && !processing && (
          <div className="bg-blue-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-3">
                  1
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Upload Recording</h4>
                <p className="text-gray-600 text-sm">
                  Upload your session audio file in any supported format
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-3">
                  2
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Processing</h4>
                <p className="text-gray-600 text-sm">
                  Our AI analyzes the conversation and identifies key patterns
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-3">
                  3
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Get Insights</h4>
                <p className="text-gray-600 text-sm">
                  Receive structured summaries and actionable recommendations
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportAI;
