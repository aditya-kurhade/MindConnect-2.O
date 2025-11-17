import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowUp,
  FaReply,
  FaFlag,
  FaRedo,
  FaClock,
  FaFire,
  FaCalendarAlt,
  FaPaperPlane,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answersSort, setAnswersSort] = useState("popular");
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [answerForm, setAnswerForm] = useState({
    content: "",
    username: "",
  });
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = {
    stress: { label: "Stress Management", style: "bg-red-100 text-red-800" },
    exam_pressure: {
      label: "Exam Pressure",
      style: "bg-orange-100 text-orange-800",
    },
    homesickness: { label: "Homesickness", style: "bg-blue-100 text-blue-800" },
    relationships: {
      label: "Relationships",
      style: "bg-pink-100 text-pink-800",
    },
    academic: {
      label: "Academic Issues",
      style: "bg-green-100 text-green-800",
    },
    general: {
      label: "General Discussion",
      style: "bg-purple-100 text-purple-800",
    },
  };

  const sortOptions = [
    { value: "popular", label: "Most Popular", icon: FaFire },
    { value: "recent", label: "Most Recent", icon: FaClock },
    { value: "oldest", label: "Oldest First", icon: FaCalendarAlt },
  ];

  const fetchQuestionAndAnswers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/questions/${id}?sortAnswersBy=${answersSort}`
      );
      const data = await response.json();
      if (data.success) {
        setQuestion(data.data.question);
        setAnswers(data.data.answers);
      } else {
        console.error("Error fetching question:", data.message);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setLoading(false);
    }
  }, [id, answersSort]);

  useEffect(() => {
    if (id) {
      fetchQuestionAndAnswers();
    }
  }, [id, fetchQuestionAndAnswers]);

  const handleUpvoteQuestion = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/questions/${id}/upvote`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.success) {
        setQuestion((prev) => ({
          ...prev,
          upvotes: data.data.upvotes,
        }));
      }
    } catch (error) {
      console.error("Error upvoting question:", error);
    }
  };

  const handleUpvoteAnswer = async (answerId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/answers/${answerId}/upvote`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.success) {
        setAnswers((prev) =>
          prev.map((answer) =>
            answer._id === answerId
              ? { ...answer, upvotes: data.data.upvotes }
              : answer
          )
        );
      }
    } catch (error) {
      console.error("Error upvoting answer:", error);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();

    if (!answerForm.content.trim()) {
      setErrors({ content: "Answer content is required" });
      return;
    }
    if (!answerForm.username.trim()) {
      setErrors({ username: "Username is required" });
      return;
    }

    setSubmittingAnswer(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: id,
          content: answerForm.content,
          username: answerForm.username,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAnswerForm({ content: "", username: "" });
        setShowAnswerForm(false);
        setErrors({});
        fetchQuestionAndAnswers(); // Refresh to get the new answer
      } else {
        setErrors({ submit: data.message || "Failed to submit answer" });
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setSubmittingAnswer(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return time.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 px-4 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading question...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 px-4 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Question not found
            </h2>
            <button
              onClick={() => navigate("/forum")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Back to Forum
            </button>
          </div>
        </div>
      </div>
    );
  }

  const categoryInfo = categories[question.category] || {
    label: "General",
    style: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 px-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/forum")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <FaArrowLeft />
            Back to Forum
          </button>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start gap-6">
            {/* Upvote Section */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={handleUpvoteQuestion}
                className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <FaArrowUp size={20} />
              </button>
              <span className="text-lg font-semibold text-gray-700">
                {question.upvotes}
              </span>
              <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <FaFlag />
              </button>
            </div>

            {/* Question Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${categoryInfo.style}`}
                >
                  {categoryInfo.label}
                </span>
                <span className="text-gray-500 text-sm">•</span>
                <span className="text-gray-500 text-sm">
                  by {question.username}
                </span>
                <span className="text-gray-500 text-sm">•</span>
                <span className="text-gray-500 text-sm">
                  {formatTimeAgo(question.createdAt)}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {question.title}
              </h1>

              <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                {question.content}
              </div>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
            </h2>

            <div className="flex gap-2">
              {/* Sort Options */}
              {sortOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setAnswersSort(option.value)}
                    className={`px-3 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm ${
                      answersSort === option.value
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <IconComponent />
                    {option.label}
                  </button>
                );
              })}

              <button
                onClick={fetchQuestionAndAnswers}
                className="px-3 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2 text-sm"
              >
                <FaRedo />
                Refresh
              </button>
            </div>
          </div>

          {/* Answer Form Button */}
          {!showAnswerForm && (
            <div className="mb-6">
              <button
                onClick={() => setShowAnswerForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
              >
                <FaReply />
                Write an Answer
              </button>
            </div>
          )}

          {/* Answer Form */}
          {showAnswerForm && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Answer
              </h3>
              <form onSubmit={handleAnswerSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="answerUsername"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Display Name *
                  </label>
                  <input
                    type="text"
                    id="answerUsername"
                    value={answerForm.username}
                    onChange={(e) =>
                      setAnswerForm((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    placeholder="How would you like to be known?"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.username}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="answerContent"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Answer *
                  </label>
                  <textarea
                    id="answerContent"
                    rows={6}
                    value={answerForm.content}
                    onChange={(e) =>
                      setAnswerForm((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    placeholder="Share your thoughts, advice, or experiences..."
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      errors.content ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.content && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.content}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {answerForm.content.length}/1500 characters
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={submittingAnswer}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {submittingAnswer ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Posting...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Post Answer
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAnswerForm(false);
                      setAnswerForm({ content: "", username: "" });
                      setErrors({});
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                {errors.submit && (
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                )}
              </form>
            </div>
          )}

          {/* Answers List */}
          <div className="space-y-6">
            {answers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  No answers yet. Be the first to help!
                </p>
                {!showAnswerForm && (
                  <button
                    onClick={() => setShowAnswerForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    Write the First Answer
                  </button>
                )}
              </div>
            ) : (
              answers.map((answer) => (
                <div key={answer._id} className="border-t border-gray-200 pt-6">
                  <div className="flex items-start gap-4">
                    {/* Upvote Section */}
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleUpvoteAnswer(answer._id)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FaArrowUp />
                      </button>
                      <span className="text-sm font-semibold text-gray-700">
                        {answer.upvotes}
                      </span>
                      <button className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <FaFlag size={12} />
                      </button>
                    </div>

                    {/* Answer Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-medium text-gray-900">
                          {answer.username}
                        </span>
                        <span className="text-gray-500 text-sm">•</span>
                        <span className="text-gray-500 text-sm">
                          {formatTimeAgo(answer.createdAt)}
                        </span>
                      </div>

                      <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                        {answer.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
