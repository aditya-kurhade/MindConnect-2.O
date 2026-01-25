import React, { useState } from "react";
import AIInsightCard from "../components/AICard";
import ChatbotCard from "../components/ChatbotCard";
import {
  FaRegHeart,
  FaUserFriends,
  FaHeart,
  FaShieldAlt,
  FaCalendarCheck,
  FaHandsHelping,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function Home() {
  const [active, setActive] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center pt-20 flex-1 text-center bg-gradient-to-b from-blue-50 to-white">
        <span className="text-sm font-semibold text-blue-900 bg-blue-100 px-4 py-1 rounded-full mb-2">
          Trusted by thousands worldwide
        </span>

        <h2 className="text-5xl font-bold text-gray-900 leading-snug">
          Professional Counselling <br />
          <span className="text-blue-600 ">Made Accessible</span>
        </h2>
        <p className="mt-6 text-lg  text-gray-600 max-w-3xl">
          Connect with licensed mental health professionals through our secure
          platform. Get personalized support, book appointments, and take
          control of your mental wellness journey.
        </p>

        {/* Options */}
        <div className="flex flex-col md:flex-row gap-6 mt-12">
          {/* Client Button */}
          <button
            onClick={() => setActive(active === "client" ? "" : "client")}
            className={`flex items-center gap-4 px-6 py-3 rounded-xl transition text-gray-800 text-base border 
          ${
            active === "client"
              ? "shadow-lg border-2 border-blue-500 bg-blue-50"
              : "border-gray-300 hover:bg-gray-100 hover:shadow-md"
          }
        `}
          >
            <FaHeart className={`text-3xl text-blue-600`} />
            <span className="text-left">
              <span className="font-bold block">I'm seeking support</span>
              <span className="text-sm">Connect with a counsellor</span>
            </span>
          </button>

          {/* Counsellor Button */}
          <button
            onClick={() =>
              setActive(active === "counsellor" ? "" : "counsellor")
            }
            className={`flex items-center gap-4 px-6 py-3 rounded-xl transition text-gray-800 text-base border 
          ${
            active === "counsellor"
              ? "shadow-lg border-2 border-green-500 bg-green-50"
              : "border-gray-300 hover:bg-gray-100 hover:shadow-md"
          }
        `}
          >
            <FaUserFriends
              className={`text-3xl ${
                active === "counsellor" ? "text-green-700" : "text-green-600"
              }`}
            />
            <span className="text-left">
              <span className="font-bold block">I'm a counsellor</span>
              <span className="text-sm">Help clients on their journey</span>
            </span>
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-6 mt-12">
          <Link
            to={active ? "/signup" : "#"}
            style={{ pointerEvents: active ? "auto" : "none" }}
          >
            <button
              disabled={!active}
              className={`px-6 py-3 rounded-xl font-semibold shadow-md transition flex items-center gap-x-2 justify-center gap-2 text-lg
                ${
                  active
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              {active === "client"
                ? "Get started as Client"
                : active === "counsellor"
                ? "Get started as Counsellor"
                : "Get started as..."}
            </button>
          </Link>
          <Link to="/forum">
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold text-lg hover:bg-blue-50 transition">
              Join Student Forum
            </button>
          </Link>
        </div>

        <div className="text-left mt-16"> <AIInsightCard /></div>

        {/* ChatBot Session Insight Generator */}
        <div className="text-left mt-16"><ChatbotCard /></div>

        {/* Forum CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Connect with Fellow Students
            </h3>
            <p className="text-gray-600 mb-6">
              Join our supportive community forum where students share
              experiences, ask questions, and support each other through
              challenges.
            </p>
            <Link to="/forum">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Explore Student Forum
              </button>
            </Link>
          </div>
        </div>

        {/* Resources CTA */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-2xl max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Mental Health Resources
            </h3>
            <p className="text-gray-600 mb-6">
              Access guided meditations, focus music, relaxation techniques, and
              educational content designed to support your mental well-being and
              academic success.
            </p>
            <Link to="/resources">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Explore Resources
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <section className="bg-white py-35 px-6 md:px-25 text-center grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-3xl font-bold text-blue-600">10,000+</h3>
          <p className="text-gray-600">Happy Clients</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-blue-600">500+</h3>
          <p className="text-gray-600">Licensed Counsellors</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-blue-600">50,000+</h3>
          <p className="text-gray-600">Sessions Completed</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-blue-600">4.9/5</h3>
          <p className="text-gray-600">Average Rating</p>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-blue-50 py-16 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Why Choose <span className="text-blue-600">MindConnect</span> ?
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          We're committed to making mental health support accessible, secure,
          and effective for everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <FaHandsHelping className="text-3xl text-blue-600 mb-3" />
            <h3 className="text-xl font-bold mb-2">Compassionate Care</h3>
            <p className="text-gray-600">
              Connect with licensed professionals who understand your unique
              journey.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <FaShieldAlt className="text-3xl text-blue-600 mb-3" />
            <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
            <p className="text-gray-600">
              Your conversations and data are protected with enterprise-grade
              security.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <FaSearch className="text-3xl text-blue-600 mb-3" />
            <h3 className="text-xl font-bold mb-2">Expert Matching</h3>
            <p className="text-gray-600">
              Advanced algorithms match you with the right counsellor for your
              needs.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <FaCalendarCheck className="text-3xl text-blue-600 mb-3" />
            <h3 className="text-xl font-bold mb-2">Flexible Scheduling</h3>
            <p className="text-gray-600">
              Book sessions that fit your schedule, with 24/7 support available.
            </p>
          </div>
        </div>
      </section>

      {/* Ready to Start Section */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-gray-600 mb-8">
          Join thousands who have found support and guidance through our
          platform.
        </p>
        <Link to="/signup">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition">
            Sign Up Today
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-gray-600 text-sm">
        <p>MindConnect</p>
        <p>© 2025 MindConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}
