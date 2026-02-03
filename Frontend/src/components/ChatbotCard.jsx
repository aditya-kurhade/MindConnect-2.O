// ChatbotCard.jsx
import { Link } from "react-router-dom";
import { FiMessageCircle, FiArrowRight, FiCheckCircle } from "react-icons/fi";

const ChatbotCard = () => {
  const features = [
    "Case Understanding",
    "Follow-up Prompts",
    "Emotional Context",
    "Smart Suggestions"
  ];

  const metaChips = [
    {
      label: "Upload PDFs",
      className: "px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium"
    },
    {
      label: "Get contextual answers",
      className: "px-3 py-1 bg-pink-50 text-pink-700 rounded-full font-medium"
    },
    {
      label: "Source citations",
      className: "px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium"
    }
  ];

  return (
    <div className="mt-16 max-w-6xl mx-auto px-4">
      <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-32 translate-x-32 opacity-60"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-50 to-purple-50 rounded-full translate-y-24 -translate-x-24 opacity-60"
        />

        <div className="relative p-8 md:p-10">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
              <FiMessageCircle aria-hidden="true" className="text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">For Counsellors</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Counsellor Knowledge Chat</h3>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
            {/* Left content */}
            <div>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                A smart conversational assistant designed to support counsellors during sessions with real-time guidance, document-based Q&A, and clarity.
              </p>

              {/* Features grid */}
              <ul className="grid grid-cols-2 gap-3 mb-6" role="list">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <FiCheckCircle aria-hidden="true" className="text-purple-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {metaChips.map((chip) => (
                  <span key={chip.label} className={chip.className}>
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right CTA */}
            <div className="flex flex-col items-center gap-4">
              <Link
                to="/rag-chatbot"
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2"
              >
                Open Chatbot
                <FiArrowRight aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ai-chatbot/sample"
                className="text-sm text-purple-600 hover:text-purple-700 hover:underline"
              >
                View sample conversation →
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-400 mt-8 pt-6 border-t border-gray-100">
            💡 AI responses are assistive and should not replace professional judgment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotCard;
