import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
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
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import AiChatbot from "./AiChatbot";

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


export default function Home() {
  const [active, setActive] = useState("");
  const primaryCtaLabel = useMemo(() => {
    if (active === "client") return "Get started as Client";
    if (active === "counsellor") return "Get started as Counsellor";
    return "Get started as...";
  }, [active]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <main className="relative flex flex-col items-center pt-24 pb-16 flex-1 text-center overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-purple-50/30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl -translate-x-1/2" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-5xl mx-auto px-4"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-900 bg-blue-100/80 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 border border-blue-200/50"
          >
            <HiSparkles className="text-blue-600" />
            Trusted by thousands worldwide
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight"
          >
            Professional Counselling{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Made Accessible
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Connect with licensed mental health professionals through our secure
            platform. Get personalized support, book appointments, and take
            control of your mental wellness journey.
          </motion.p>
        </motion.div>

        {/* Options */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 flex flex-col md:flex-row gap-4 mt-12 px-4"
          role="radiogroup"
          aria-label="Choose your role"
        >
          {/* Client Button */}
          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActive(active === "client" ? "" : "client")}
            type="button"
            aria-pressed={active === "client"}
            className={`group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 text-gray-800 text-base border-2 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2
          ${
            active === "client"
              ? "shadow-xl border-blue-500 bg-blue-50/80 scale-[1.02]"
              : "border-gray-200 bg-white/60 hover:bg-white hover:border-blue-300 hover:shadow-lg"
          }
        `}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                active === "client"
                  ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg"
                  : "bg-blue-100 text-blue-600 group-hover:bg-blue-500 group-hover:text-white"
              }`}
            >
              <FaHeart aria-hidden="true" className="text-xl" />
            </div>
            <span className="text-left">
              <span className="font-bold block text-gray-900">I'm seeking support</span>
              <span className="text-sm text-gray-500">Connect with a counsellor</span>
            </span>
          </motion.button>

          {/* Counsellor Button */}
          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              setActive(active === "counsellor" ? "" : "counsellor")
            }
            type="button"
            aria-pressed={active === "counsellor"}
            className={`group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 text-gray-800 text-base border-2 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2
          ${
            active === "counsellor"
              ? "shadow-xl border-green-500 bg-green-50/80 scale-[1.02]"
              : "border-gray-200 bg-white/60 hover:bg-white hover:border-green-300 hover:shadow-lg"
          }
        `}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                active === "counsellor"
                  ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg"
                  : "bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white"
              }`}
            >
              <FaUserFriends aria-hidden="true" className="text-xl" />
            </div>
            <span className="text-left">
              <span className="font-bold block text-gray-900">I'm a counsellor</span>
              <span className="text-sm text-gray-500">Help clients on their journey</span>
            </span>
          </motion.button>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 flex flex-col sm:flex-row gap-4 mt-10 px-4"
        >
          {active ? (
            <motion.div variants={fadeInUp}>
              <Link
                to="/signup"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
              >
                {primaryCtaLabel}
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ) : (
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg bg-gray-200 text-gray-400 cursor-not-allowed"
              aria-disabled="true"
            >
              {primaryCtaLabel}
            </motion.span>
          )}
          <motion.div variants={fadeInUp}>
            <Link
              to="/forum"
              className="group inline-flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            >
              Join Student Forum
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <section className="text-left mt-16" aria-labelledby="ai-insights">
          <h2 id="ai-insights" className="sr-only">AI insights</h2>
          <AIInsightCard />
        </section>

        {/* ChatBot Session Insight Generator */}
        <section className="text-left mt-16" aria-labelledby="counsellor-chat">
          <h2 id="counsellor-chat" className="sr-only">Counsellor knowledge chat</h2>
          <ChatbotCard />
        </section>

        {/* Forum CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mt-16 mx-4 max-w-4xl lg:mx-auto"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600 p-8 md:p-12 rounded-3xl shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />
            <div className="relative text-center text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Connect with Fellow Students
              </h3>
              <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                Join our supportive community forum where students share
                experiences, ask questions, and support each other through
                challenges.
              </p>
              <Link
                to="/forum"
                className="group inline-flex items-center gap-2 bg-white text-purple-700 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600"
              >
                Explore Student Forum
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Resources CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 mt-8 mx-4 max-w-4xl lg:mx-auto"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 p-8 md:p-12 rounded-3xl shadow-2xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 -translate-x-32" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 translate-x-24" />
            <div className="relative text-center text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Mental Health Resources
              </h3>
              <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
                Access guided meditations, focus music, relaxation techniques, and
                educational content designed to support your mental well-being and
                academic success.
              </p>
              <Link
                to="/resources"
                className="group inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-600"
              >
                Explore Resources
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Stats Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.span
              variants={fadeInUp}
              className="text-sm font-semibold text-blue-600 uppercase tracking-wider"
            >
              Our Impact
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-gray-900 mt-2"
            >
              Trusted by Thousands
            </motion.h2>
          </motion.div>
          <motion.dl
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { value: "10,000+", label: "Happy Clients", icon: FaHeart, color: "blue" },
              { value: "500+", label: "Licensed Counsellors", icon: FaUserFriends, color: "green" },
              { value: "50,000+", label: "Sessions Completed", icon: FaCalendarCheck, color: "purple" },
              { value: "4.9/5", label: "Average Rating", icon: FaStar, color: "amber" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                      stat.color === "blue"
                        ? "bg-blue-100 text-blue-600"
                        : stat.color === "green"
                        ? "bg-green-100 text-green-600"
                        : stat.color === "purple"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    <stat.icon className="text-xl" />
                  </div>
                  <dd
                    className={`text-3xl md:text-4xl font-bold ${
                      stat.color === "blue"
                        ? "text-blue-600"
                        : stat.color === "green"
                        ? "text-green-600"
                        : stat.color === "purple"
                        ? "text-purple-600"
                        : "text-amber-600"
                    }`}
                  >
                    {stat.value}
                  </dd>
                  <dt className="text-gray-600 mt-1 font-medium">{stat.label}</dt>
                </div>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-blue-50 py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-sm font-semibold text-blue-600 uppercase tracking-wider"
            >
              Why Us
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold text-gray-900 mt-2"
            >
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                MindConnect
              </span>
              ?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 max-w-2xl mx-auto mt-4 text-lg"
            >
              We're committed to making mental health support accessible, secure,
              and effective for everyone.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: FaHandsHelping,
                title: "Compassionate Care",
                desc: "Connect with licensed professionals who understand your unique journey.",
                gradient: "from-blue-500 to-cyan-500",
                bg: "bg-blue-50",
              },
              {
                icon: FaShieldAlt,
                title: "Secure & Private",
                desc: "Your conversations and data are protected with enterprise-grade security.",
                gradient: "from-green-500 to-emerald-500",
                bg: "bg-green-50",
              },
              {
                icon: FaSearch,
                title: "Expert Matching",
                desc: "Advanced algorithms match you with the right counsellor for your needs.",
                gradient: "from-purple-500 to-pink-500",
                bg: "bg-purple-50",
              },
              {
                icon: FaCalendarCheck,
                title: "Flexible Scheduling",
                desc: "Book sessions that fit your schedule, with 24/7 support available.",
                gradient: "from-amber-500 to-orange-500",
                bg: "bg-amber-50",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="h-full p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-left">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}
                  >
                    <feature.icon aria-hidden="true" className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ready to Start Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Join thousands who have found support and guidance through our
            platform. Your mental wellness journey starts here.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 bg-white text-blue-700 px-10 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:bg-blue-50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-700"
            >
              Sign Up Today
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <FaHeart className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-white">MindConnect</span>
            </div>
            <div className="flex items-center gap-6 text-gray-400">
              <Link to="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link to="/resources" className="hover:text-white transition-colors">
                Resources
              </Link>
              <Link to="/forum" className="hover:text-white transition-colors">
                Forum
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} MindConnect. All rights reserved. Made with{" "}
              <FaHeart className="inline text-red-500" /> for mental wellness.
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Widget */}
      <AiChatbot />
    </div>
  );
}
