import React, { useState } from "react";
import {
  FaLongArrowAltLeft,
  FaRegHeart,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [accountType, setAccountType] = useState("Client");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Local login function (replaces previous `useAuth` hook usage).
  // Adjust the endpoint `/api/login` if your backend uses a different route.
  const loginUser = async (email, password, role) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error((errorData && errorData.message) || res.statusText || "Login failed");
    }

    const data = await res.json();
    // Save token if backend returns one
    if (data && data.token) {
      try {
        localStorage.setItem("token", data.token);
      } catch {
        // ignore localStorage errors
      }
    }

    return data;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setIsLoading(true);

      await loginUser(formData.email, formData.password, accountType);

      if (accountType === "Client") {
        navigate("/client-dashboard");
      } else {
        navigate("/counsellor-dashboard");
      }

      // Redirect to home page after successful login
    } catch (error) {
      setError(error.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <div className="flex flex-col justify-center items-center text-center mt-8 mb-8 pt-2">
        <Link
          to="/"
          className="flex items-center justify-center text-sm text-black font-semibold mb-4 space-x-2 p-2 hover:bg-gray-100 rounded-md"
          aria-label="Back to Home"
        >
          <FaLongArrowAltLeft />
          <span>Back to Home</span>
        </Link>

        <h1 className="text-xl font-bold text-black flex items-center space-x-2">
          <FaRegHeart className="text-blue-500" />
          <span>MindConnect</span>
        </h1>

        <h2 className="text-2xl font-bold mt-2">Welcome Back</h2>
        <p className="text-gray-600 mt-1">Sign in to continue your journey</p>
      </div>

      {/* Form */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Sign In</h2>
        <p className="text-sm text-gray-500 mb-6">
          Choose your account type and enter your credentials
        </p>

        {/* Toggle */}
        <div className="flex mb-6 bg-gray-100 rounded-md p-1">
          <button
            onClick={() => setAccountType("Client")}
            type="button"
            className={`w-1/2 py-2 text-sm font-medium border rounded-md ${
              accountType === "Client"
                ? "bg-white text-gray-900 border-gray-200"
                : "bg-gray-100 text-gray-500 border-none"
            }`}
          >
            Client
          </button>
          <button
            onClick={() => setAccountType("Counsellor")}
            type="button"
            className={`w-1/2 py-2 text-sm font-medium border rounded-md ${
              accountType === "Counsellor"
                ? "bg-white text-gray-900 border-gray-200"
                : "bg-gray-100 text-gray-500 border-none"
            }`}
          >
            Counsellor
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition disabled:opacity-70"
          >
            {isLoading
              ? "Signing In..."
              : accountType === "Client"
              ? "Sign In as Client"
              : "Sign In as Counsellor"}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-sm text-center">
          <Link
            to="/forgot-password"
            className="text-indigo-500 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
