// ChatbotCard.jsx
import { Link } from "react-router-dom";

const ChatbotCard = () => {
  return (
    <div className="mt-20 max-w-6xl mx-auto px-4 relative">
      <div className="relative">
        {/* Left Gradient Stripe */}
        <div className="absolute left-0 top-0 h-full w-1 
                        bg-gradient-to-b from-purple-400 to-pink-400 
                        rounded-l-2xl" />

        {/* Card with new gradient */}
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-pink-100 border border-transparent rounded-2xl
                        p-10 pl-12 hover:border-pink-200 hover:shadow-lg transition">

          {/* Counsellor Tag with blinking dot */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-green-700">For Counsellor</span>
          </div>

          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center mt-2">
            {/* Left Section */}
            <div className="max-w-3xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                AI Chatbot for Counsellors
              </h3>

              <p className="text-gray-700 mb-4">
                A smart conversational assistant designed to support counsellors
                <br /> during sessions with real-time guidance and clarity.
              </p>

              <p className="text-sm text-gray-600 mb-4">
                Case Understanding • Follow-up Prompts • Emotional Context • Suggestions
              </p>

              <p className="text-sm text-gray-600">
                Ask questions → Get contextual responses instantly
              </p>

              <p className="text-sm text-gray-600 mt-2">
                Helps counsellors think clearly, stay structured, and reduce cognitive load.
              </p>

              <Link
                to="/ai-chatbot/sample"
                className="inline-block mt-4 text-sm font-medium text-pink-600 hover:underline"
              >
                View sample chatbot conversation →
              </Link>
            </div>

            {/* CTA with hover arrow */}
            <div className="flex md:justify-end">
              <Link to="/ai-chatbot">
                <button
                  className="group flex items-center gap-2 px-8 py-3
                             bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium
                             hover:from-purple-700 hover:to-pink-700 transition"
                >
                  Open Counsellor Chatbot
                  <span className="opacity-0 translate-x-[-4px]
                                   group-hover:opacity-100 group-hover:translate-x-0
                                   transition-all">
                    →
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 mt-8">
            AI responses are assistive and should not replace professional judgment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotCard;
