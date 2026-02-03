// AIInsightCard.jsx
import { Link } from "react-router-dom";
import { FiMic, FiArrowRight, FiCheckCircle, FiClock } from "react-icons/fi";

const AIInsightCard = () => {
  const features = [
    "Session Summary",
    "Key Topics",
    "Emotional Signals",
    "Action Items"
  ];

  const metaChips = [
    {
      label: "~2–3 min processing",
      className: "inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium",
      icon: FiClock
    },
    {
      label: "Upload audio",
      className: "px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full font-medium"
    },
    {
      label: "Get insights",
      className: "px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full font-medium"
    }
  ];

  return (
    <div className="mt-16 max-w-6xl mx-auto px-4">
      <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full -translate-y-32 translate-x-32 opacity-60"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-50 to-blue-50 rounded-full translate-y-24 -translate-x-24 opacity-60"
        />

        <div className="relative p-8 md:p-10">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
              <FiMic aria-hidden="true" className="text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wide">AI Powered</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Session Insight Generator</h3>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
            {/* Left content */}
            <div>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Convert counselling session recordings into structured summaries, emotional signals, and actionable next steps—automatically.
              </p>

              {/* Features grid */}
              <ul className="grid grid-cols-2 gap-3 mb-6" role="list">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <FiCheckCircle aria-hidden="true" className="text-blue-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {metaChips.map((chip) => {
                  const Icon = chip.icon;
                  return (
                    <span key={chip.label} className={chip.className}>
                      {Icon ? <Icon aria-hidden="true" className="text-xs" /> : null}
                      {chip.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Right CTA */}
            <div className="flex flex-col items-center gap-4">
              <Link
                to="/ai-report"
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
              >
                Generate Insights
                <FiArrowRight aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ai-insights/sample"
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                View sample AI report →
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-400 mt-8 pt-6 border-t border-gray-100">
            💡 AI-generated insights must be reviewed by the counsellor before use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsightCard;
