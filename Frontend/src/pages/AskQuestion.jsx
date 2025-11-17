import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import Navbar from "../components/Navbar";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const AskQuestion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    username: "",
    category: "general",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    {
      value: "stress",
      label: "Stress Management",
      description: "Dealing with academic and personal stress",
    },
    {
      value: "exam_pressure",
      label: "Exam Pressure",
      description: "Test anxiety and exam preparation struggles",
    },
    {
      value: "homesickness",
      label: "Homesickness",
      description: "Missing home, family, and familiar places",
    },
    {
      value: "relationships",
      label: "Relationships",
      description: "Friends, family, and romantic relationships",
    },
    {
      value: "academic",
      label: "Academic Issues",
      description: "Study methods, course difficulties, and academic planning",
    },
    {
      value: "general",
      label: "General Discussion",
      description: "Any other topics you'd like to discuss",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Question content is required";
    } else if (formData.content.length > 2000) {
      newErrors.content = "Content must be less than 2000 characters";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length > 50) {
      newErrors.username = "Username must be less than 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/forum");
      } else {
        setErrors({ submit: data.message || "Failed to create question" });
      }
    } catch (error) {
      console.error("Error creating question:", error);
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ask a Question
          </h1>
          <p className="text-gray-600">
            Share your concerns and get support from fellow students
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Display Name *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="How would you like to be known? (e.g., StudentInNeed, John123)"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                You can use your real name or a pseudonym. This will be visible
                to others.
              </p>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <label
                    key={cat.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.category === cat.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat.value}
                      checked={formData.category === cat.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="font-medium text-gray-900 mb-1">
                      {cat.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {cat.description}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Question Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Summarize your question in one line..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {formData.title.length}/200 characters
              </p>
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Question Details *
              </label>
              <textarea
                id="content"
                name="content"
                rows={8}
                value={formData.content}
                onChange={handleChange}
                placeholder="Describe your situation in detail. The more context you provide, the better advice you'll receive..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  errors.content ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {formData.content.length}/2000 characters
              </p>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">
                Community Guidelines
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be respectful and supportive of others</li>
                <li>• No sharing of personal contact information</li>
                <li>• Report harmful or inappropriate content</li>
                <li>
                  • Remember that this is a peer support space, not professional
                  therapy
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate("/forum")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Posting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Post Question
                  </>
                )}
              </button>
            </div>

            {errors.submit && (
              <div className="text-red-600 text-sm text-center">
                {errors.submit}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
