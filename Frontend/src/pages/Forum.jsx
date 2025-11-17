import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaArrowUp,
  FaComment,
  FaRedo,
  FaFilter,
  FaSearch,
  FaClock,
  FaFire,
  FaCalendarAlt,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const Forum = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { value: "all", label: "All Topics", color: "gray" },
    { value: "stress", label: "Stress Management", color: "red" },
    { value: "exam_pressure", label: "Exam Pressure", color: "orange" },
    { value: "homesickness", label: "Homesickness", color: "blue" },
    { value: "relationships", label: "Relationships", color: "pink" },
    { value: "academic", label: "Academic Issues", color: "green" },
    { value: "general", label: "General Discussion", color: "purple" },
  ];

  const sortOptions = [
    { value: "recent", label: "Most Recent", icon: FaClock },
    { value: "popular", label: "Most Popular", icon: FaFire },
    { value: "oldest", label: "Oldest First", icon: FaCalendarAlt },
  ];

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/questions?category=${category}&sortBy=${sortBy}&limit=20`
      );
      const data = await response.json();
      if (data.success) {
        setQuestions(data.data.questions);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  }, [category, sortBy]);

  useEffect(() => {
    fetchQuestions();
  }, [category, sortBy, fetchQuestions]);

  const filteredQuestions = questions.filter(
    (question) =>
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryStyle = (categoryValue) => {
    const colorMap = {
      stress: "bg-red-100 text-red-800 border-red-300",
      exam_pressure: "bg-orange-100 text-orange-800 border-orange-300",
      homesickness: "bg-blue-100 text-blue-800 border-blue-300",
      relationships: "bg-pink-100 text-pink-800 border-pink-300",
      academic: "bg-green-100 text-green-800 border-green-300",
      general: "bg-purple-100 text-purple-800 border-purple-300",
      all: "bg-gray-100 text-gray-800 border-gray-300",
    };
    return colorMap[categoryValue] || colorMap["all"];
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Student Forum
              </h1>
              <p className="text-gray-600">
                A safe space for students to share experiences and support each
                other
              </p>
            </div>
            <Link to="/forum/ask">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                <FaPlus />
                Ask Question
              </button>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    category === cat.value
                      ? getCategoryStyle(cat.value)
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex gap-2">
              {sortOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                      sortBy === option.value
                        ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent"
                    }`}
                  >
                    <IconComponent />
                    {option.label}
                  </button>
                );
              })}
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchQuestions}
              disabled={loading}
              className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2"
            >
              <FaRedo className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading questions...</p>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FaComment size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No questions found
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to start a discussion!
              </p>
              <Link to="/forum/ask">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
                  Ask the First Question
                </button>
              </Link>
            </div>
          ) : (
            filteredQuestions.map((question) => (
              <div
                key={question._id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Upvote Section */}
                  <div className="flex flex-col items-center gap-1">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <FaArrowUp />
                    </button>
                    <span className="text-sm font-semibold text-gray-700">
                      {question.upvotes}
                    </span>
                  </div>

                  {/* Question Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryStyle(
                          question.category
                        )}`}
                      >
                        {
                          categories.find((c) => c.value === question.category)
                            ?.label
                        }
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

                    <Link to={`/forum/question/${question._id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                        {question.title}
                      </h3>
                    </Link>

                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {question.content}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaComment />
                        <span>{question.answersCount} answers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;
