import React, { useState, useEffect } from "react";
import { FaLongArrowAltLeft, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [accountType, setAccountType] = useState("Client");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    licenseNumber: "",
    specialization: "",
    experience: "",
    location: "",
    bio: "",
    ageRange: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Local registration function (replaces previous `useAuth` hook usage).
  // Update the endpoint `/api/register` if your backend uses a different route.
  const registerUser = async (userData) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error((errorData && errorData.message) || res.statusText || "Registration failed");
    }

    return res.json();
  };

  useEffect(() => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      licenseNumber: "",
      specialization: "",
      experience: "",
      location: "",
      bio: "",
      ageRange: "",
    });
    setPasswordError("");
  }, [accountType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset error if password fields are changed
    if (name === "password" || name === "confirmPassword") {
      if (formData.password === value || formData.confirmPassword === value) {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");

    try {
      setIsLoading(true);
      setError("");

      // Prepare data for backend
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: accountType,
        ageRange: formData.ageRange,
        location: formData.location,
      };

      // Add counsellor-specific fields if applicable
      if (accountType === "Counsellor") {
        userData.licenseNumber = formData.licenseNumber;
        userData.specialization = formData.specialization;
        userData.experience = formData.experience;
        userData.bio = formData.bio;
      }

      await registerUser(userData);
      // Redirect to home page after successful registration

      if (accountType === "Client") {
        navigate("/client-dashboard");
      }

      if (accountType === "Counsellor") {
        navigate("/counsellor-dashboard");
      }
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-green-50">
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

        <h2 className="text-2xl font-bold mt-2">Create Your Account</h2>
        <p className="text-gray-600 mt-1">
          Join our community of healing and support
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Sign Up</h2>
        <p className="text-sm text-gray-500 mb-6">
          Choose your account type and fill in your information
        </p>

        <div className="flex mb-6 bg-gray-100 rounded-md p-1">
          <button
            onClick={() => setAccountType("Client")}
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
          <div className="flex space-x-3">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Password Fields */}
          {accountType === "Counsellor" ? (
            <div className="flex flex-col space-y-1">
              <div className="flex space-x-3">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              {passwordError && (
                <span className="text-red-500 text-sm">{passwordError}</span>
              )}
            </div>
          ) : (
            <div className="flex flex-col space-y-1">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {passwordError && (
                <span className="text-red-500 text-sm">{passwordError}</span>
              )}
            </div>
          )}

          {/* Counsellor extra fields */}
          {accountType === "Counsellor" && (
            <>
              <div>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="Professional license number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div className="flex space-x-3">
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-500"
                >
                  <option>Select specialization</option>
                  <option>Psychologist</option>
                  <option>Therapist</option>
                  <option>Counsellor</option>
                  <option>Psychiatrist</option>
                </select>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-500"
                >
                  <option>Select experience</option>
                  <option>0-2 years</option>
                  <option>3-5 years</option>
                  <option>6-10 years</option>
                  <option>10+ years</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell clients about your approach and experience..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                ></textarea>
              </div>
            </>
          )}

          {/* Client-only fields */}
          {accountType === "Client" && (
            <div className="flex space-x-3">
              <select
                name="ageRange"
                value={formData.ageRange}
                onChange={handleChange}
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-500"
              >
                <option>Select age range</option>
                <option>18-25</option>
                <option>26-35</option>
                <option>36-50</option>
                <option>50+</option>
              </select>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition disabled:opacity-70"
            onClick={() => {accountType === "Client" ? navigate("/client-dashboard") : navigate("/counsellor-dashboard")}}
          >
            {isLoading
              ? "Creating Account..."
              : accountType === "Client"
              ? "Create Client Account"
              : "Create Counsellor Account"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-indigo-500 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
