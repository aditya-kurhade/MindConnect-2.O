// AIInsightCard.jsx
import { Link } from "react-router-dom";

const AIInsightCard = () => {
  return (
    <div className="mt-20 max-w-6xl mx-auto px-4">
      <div className="relative">
        {/* Left Accent Stripe */}
        <div className="absolute left-0 top-0 h-full w-1 bg-blue-300 rounded-l-2xl" />

        <div className="bg-blue-50 border border-blue-100 rounded-2xl
                        p-10 pl-12 hover:border-blue-200 hover:shadow-sm transition">

          {/* Badge */}
          <span className="text-xs font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            AI Powered
          </span>

          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center mt-4">
            {/* Left Section */}
            <div className="max-w-3xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Session Insight Generator
              </h3>

              <p className="text-gray-600 mb-4">
                Convert counselling session recordings into structured summaries,
                <br></br> emotional signals, and action items.
              </p>

              <p className="text-sm text-gray-500 mb-4">
                Summary • Key Topics • Emotional Signals • Action Items
              </p>

              <p className="text-sm text-gray-500">
                Upload recording → Get insights in ~2–3 minutes
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Used by counsellors to save time on session documentation.
              </p>

              <Link
                to="/ai-insights/sample"
                className="inline-block mt-4 text-sm font-medium text-blue-700 hover:underline"
              >
                View sample AI report →
              </Link>
            </div>

            {/* CTA with hover arrow */}
            <div className="flex md:justify-end">
              <Link to="/ai-report">
                <button
                  className="group flex items-center gap-2 px-8 py-3
                             bg-blue-600 text-white rounded-lg font-medium
                             hover:bg-blue-700 transition"
                >
                  Generate Session Insights
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
          <p className="text-xs text-gray-400 mt-8">
            AI-generated insights must be reviewed by the counsellor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsightCard;
