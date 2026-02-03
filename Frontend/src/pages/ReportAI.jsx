import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUploadCloud, FiFileText, FiCheckCircle, FiAlertTriangle, FiClock, FiMic, FiTrendingUp, FiTarget, FiActivity, FiArrowLeft } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiSparkles } from "react-icons/hi2";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Demo data for preview
const DEMO_ANALYSIS_DATA = {
  transcript: "Client: I've been feeling really overwhelmed lately with work and personal responsibilities. It's like there's never enough time in the day. Counsellor: I hear you. Can you tell me more about what specifically is causing you to feel overwhelmed? Client: Well, my workload has increased significantly, and I'm also dealing with some family issues. I've been having trouble sleeping, and I feel anxious most of the time. Counsellor: That sounds really challenging. How long have you been experiencing these feelings? Client: It's been about three months now. I tried some breathing exercises you suggested last time, and they help a bit, but the underlying stress is still there. Counsellor: I'm glad the breathing exercises are helping somewhat. Let's explore some additional coping strategies today and also look at ways to address the root causes of your stress.",
  sentiment: "mixed",
  emotions: ["anxiety", "hope", "frustration", "determination"],
  topics: ["work stress", "family issues", "sleep problems", "coping strategies", "time management"],
  summary: "The client is experiencing significant work-related stress compounded by family issues, leading to sleep difficulties and persistent anxiety. Previous breathing exercises have provided some relief. The session focused on exploring additional coping mechanisms and addressing root causes of stress.",
  emotionalSignals: [
    { emotion: "Anxiety", level: "High", context: "Discussion about workload increase and time management" },
    { emotion: "Hope", level: "Moderate", context: "When discussing progress with breathing exercises" },
    { emotion: "Frustration", level: "Moderate", context: "Regarding family issues and feeling overwhelmed" },
    { emotion: "Determination", level: "High", context: "Willingness to explore new coping strategies" },
  ],
  actionItems: [
    "Practice progressive muscle relaxation before bed to improve sleep quality",
    "Create a prioritized daily task list to manage workload effectively",
    "Schedule 30-minute 'worry time' to contain anxious thoughts",
    "Explore boundary-setting techniques for family relationships",
    "Follow-up session in 1 week to review progress",
  ],
  riskLevel: "Low to Moderate",
  riskNote: "Client shows good self-awareness and engagement. Monitor sleep patterns and anxiety levels.",
};

const ReportAI = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNewAnalysis = () => {
    setAnalysisData(null);
    setFileName(null);
    setUploadStatus(null);
    setUploadProgress(0);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);
    setUploadStatus("uploading");
    setUploadProgress(0);

    // Simulate upload and processing (30 seconds total)
    const steps = [
      { progress: 5, delay: 1000, status: "uploading" },
      { progress: 10, delay: 2000, status: "uploading" },
      { progress: 15, delay: 3000, status: "uploading" },
      { progress: 20, delay: 4000, status: "processing" },
      { progress: 25, delay: 6000, status: "processing" },
      { progress: 30, delay: 8000, status: "processing" },
      { progress: 40, delay: 10000, status: "processing" },
      { progress: 50, delay: 13000, status: "processing" },
      { progress: 60, delay: 16000, status: "processing" },
      { progress: 70, delay: 19000, status: "processing" },
      { progress: 80, delay: 22000, status: "processing" },
      { progress: 90, delay: 25000, status: "processing" },
      { progress: 95, delay: 27000, status: "processing" },
      { progress: 100, delay: 29000, status: "processing" },
    ];

    steps.forEach(({ progress, delay, status }) => {
      setTimeout(() => {
        setUploadProgress(progress);
        setUploadStatus(status);
      }, delay);
    });

    // Show the analysis results after 30 seconds
    setTimeout(() => {
      // Customize demo data with the uploaded file name
      const customizedData = {
        ...DEMO_ANALYSIS_DATA,
        fileName: file.name,
        sessionDate: new Date().toLocaleDateString(),
      };
      setAnalysisData(customizedData);
      setLoading(false);
      setUploadStatus("success");
    }, 30000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50/30">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm text-gray-700 rounded-xl font-semibold shadow-lg border border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-300 group"
        >
          <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900 bg-blue-100/80 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 border border-blue-200/50"
          >
            <HiSparkles className="text-blue-600" />
            AI-Powered Analysis
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight"
          >
            Session{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Insight Generator
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Upload your counselling session recording to generate structured insights,
            emotional analysis, and actionable recommendations.
          </motion.p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full -translate-y-32 translate-x-32 opacity-60" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-50 to-blue-50 rounded-full translate-y-24 -translate-x-24 opacity-60" />
          
          <div className="relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 group">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
              <FiMic className="text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Upload Session Recording
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Drag and drop your audio file here, or click to browse your files
            </p>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="audio/*"
              onChange={handleUpload}
              disabled={loading}
            />
            <label
              htmlFor="fileInput"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <FiUploadCloud className="text-xl" />
              {loading ? "Processing..." : "Choose Audio File"}
            </label>
            {fileName && (
              <p className="text-sm text-blue-600 mt-4 font-medium flex items-center justify-center gap-2">
                <FiFileText /> {fileName}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-sm">
              <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full">MP3</span>
              <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full">WAV</span>
              <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full">M4A</span>
              <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full">OGG</span>
              <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full font-medium">Max 50MB</span>
            </div>
          </div>
        </motion.div>

        {/* Processing State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-12 text-center mb-8"
          >
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <AiOutlineLoading3Quarters className="text-5xl text-white animate-spin" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {uploadStatus === "uploading" && "Uploading Audio File..."}
                {uploadStatus === "processing" && "Analyzing Session Recording..."}
              </h3>
              <p className="text-blue-100 mb-6 max-w-lg mx-auto">
                {uploadStatus === "uploading" && `Securely uploading your file: ${uploadProgress}%`}
                {uploadStatus === "processing" && "Our AI is transcribing, analyzing emotions, and generating insights. This usually takes 30 seconds..."}
              </p>
              
              {/* Progress bar */}
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm text-blue-200 mb-2">
                  <span>Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-cyan-400 to-white h-3 rounded-full"
                  />
                </div>
              </div>
              
              {/* Processing steps */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {[
                  { icon: FiMic, label: "Transcribing", active: uploadProgress >= 20 },
                  { icon: FiActivity, label: "Analyzing Emotions", active: uploadProgress >= 50 },
                  { icon: FiTarget, label: "Generating Insights", active: uploadProgress >= 80 },
                ].map((step, i) => (
                  <div
                    key={step.label}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      step.active
                        ? "bg-white/20 text-white"
                        : "bg-white/5 text-blue-200/50"
                    }`}
                  >
                    <step.icon className={step.active ? "animate-pulse" : ""} />
                    {step.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Upload Error Message */}
        {uploadStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl shadow-lg p-6 mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-900">Upload Failed</h3>
                <p className="text-red-700">There was an error processing your audio file. Please try again.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Upload Success Message */}
        {uploadStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-lg p-6 mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                <FiCheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-900">Analysis Complete!</h3>
                <p className="text-green-700">Your session has been analyzed successfully. View your insights below.</p>
              </div>
            </div>
          </motion.div>
        )}



        {/* Insights Display */}
        {analysisData && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6 mt-8"
          >
          {/* Action Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Session Insights</h2>
              <p className="text-gray-500 mt-1">AI-generated analysis of your counselling session</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleNewAnalysis}
                className="px-5 py-2.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
              >
                New Analysis
              </button>
              <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                Export Report
              </button>
            </div>
          </motion.div>

          {/* Session Metadata */}
          <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <FiClock className="text-blue-600 text-xl" />
                </div>
                <p className="text-sm text-gray-500 font-medium">Session Date</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  analysisData.sentiment === 'positive' ? 'bg-green-100' :
                  analysisData.sentiment === 'negative' ? 'bg-red-100' :
                  'bg-yellow-100'
                }`}>
                  <FiTrendingUp className={`text-xl ${
                    analysisData.sentiment === 'positive' ? 'text-green-600' :
                    analysisData.sentiment === 'negative' ? 'text-red-600' :
                    'text-yellow-600'
                  }`} />
                </div>
                <p className="text-sm text-gray-500 font-medium">Overall Sentiment</p>
              </div>
              <p className={`text-2xl font-bold capitalize ${
                analysisData.sentiment === 'positive' ? 'text-green-600' :
                analysisData.sentiment === 'negative' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {analysisData.sentiment}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FiActivity className="text-purple-600 text-xl" />
                </div>
                <p className="text-sm text-gray-500 font-medium">Emotions Detected</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{analysisData.emotions.length}</p>
            </div>
          </motion.div>

          {/* Transcript */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <FiFileText className="text-white text-lg" />
              </div>
              Transcript
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{analysisData.transcript}</p>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div variants={fadeInUp} className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />
            <div className="relative">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <HiSparkles className="text-white text-lg" />
                </div>
                Session Summary
              </h3>
              <p className="text-blue-100 leading-relaxed text-lg">
                {analysisData.summary || "The session focused on client's work-related stress and anxiety management strategies. Progress noted in implementing breathing techniques and setting workplace boundaries."}
              </p>
            </div>
          </motion.div>

          {/* Key Topics */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <FiTarget className="text-white text-lg" />
              </div>
              Key Topics Discussed
            </h3>
            <div className="flex flex-wrap gap-3">
              {(analysisData.topics || [
                "Work-life balance",
                "Anxiety management",
                "Breathing techniques",
                "Workplace boundaries",
                "Stress triggers",
              ]).map((topic, index) => (
                <motion.span
                  key={topic}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-xl text-sm font-semibold capitalize border border-blue-100 hover:shadow-md transition-shadow duration-200"
                >
                  {topic}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Emotional Signals */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <FiActivity className="text-white text-lg" />
              </div>
              Emotional Signals
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {(analysisData.emotionalSignals || [
                {
                  emotion: "Anxiety",
                  level: "Moderate",
                  context: "Discussion about upcoming project deadlines",
                },
                {
                  emotion: "Hope",
                  level: "High",
                  context: "When discussing progress with coping strategies",
                },
                {
                  emotion: "Frustration",
                  level: "Low",
                  context: "Regarding communication with supervisor",
                },
              ]).map((signal, index) => (
                <motion.div
                  key={signal.emotion}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-xl p-4 border-l-4 ${
                    signal.level === "High"
                      ? "bg-red-50 border-red-500"
                      : signal.level === "Moderate"
                      ? "bg-amber-50 border-amber-500"
                      : "bg-green-50 border-green-500"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900 text-lg">{signal.emotion}</span>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        signal.level === "High"
                          ? "bg-red-200 text-red-800"
                          : signal.level === "Moderate"
                          ? "bg-amber-200 text-amber-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {signal.level}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{signal.context}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Items */}
          <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <FiCheckCircle className="text-white text-lg" />
              </div>
              Recommended Action Items
            </h3>
            <ul className="space-y-4">
              {(analysisData.actionItems || [
                "Practice daily 5-minute breathing exercises before work meetings",
                "Continue maintaining work hours boundary (no emails after 7 PM)",
                "Schedule follow-up session to review progress in 2 weeks",
                "Consider discussing workload with supervisor using prepared script",
              ]).map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                    <FiCheckCircle className="text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Risk Assessment */}
          <motion.div
            variants={fadeInUp}
            className={`rounded-2xl p-6 border-2 ${
              analysisData.riskLevel?.toLowerCase().includes('low') 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
                : analysisData.riskLevel?.toLowerCase().includes('high')
                ? 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'
                : 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200'
            }`}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                analysisData.riskLevel?.toLowerCase().includes('low')
                  ? 'bg-green-500'
                  : analysisData.riskLevel?.toLowerCase().includes('high')
                  ? 'bg-red-500'
                  : 'bg-amber-500'
              }`}>
                <FiAlertTriangle className="text-white text-lg" />
              </div>
              Risk Assessment
            </h3>
            <p className={`text-lg font-bold mb-2 ${
              analysisData.riskLevel?.toLowerCase().includes('low')
                ? 'text-green-700'
                : analysisData.riskLevel?.toLowerCase().includes('high')
                ? 'text-red-700'
                : 'text-amber-700'
            }`}>
              {analysisData.riskLevel || "Low"}
            </p>
            <p className="text-gray-700">{analysisData.riskNote || "Client shows good engagement and positive coping strategies"}</p>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            variants={fadeInUp}
            className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
                <FiAlertTriangle className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-1">Important Notice</h4>
                <p className="text-sm text-amber-800">
                  These AI-generated insights are meant to assist counsellors
                  and should not replace professional judgment. Always review and verify the analysis
                  before using it in clinical documentation or decision-making.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        )}

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 mt-12"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="text-center mb-10">
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Simple Process</span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">How It Works</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  icon: FiUploadCloud,
                  title: "Upload Recording",
                  desc: "Upload your session audio file in any supported format",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  step: "2",
                  icon: HiSparkles,
                  title: "AI Processing",
                  desc: "Our AI analyzes the conversation and identifies key patterns",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  step: "3",
                  icon: FiFileText,
                  title: "Get Insights",
                  desc: "Receive structured summaries and actionable recommendations",
                  gradient: "from-green-500 to-emerald-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg mb-4`}>
                    <item.icon className="text-2xl" />
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportAI;
