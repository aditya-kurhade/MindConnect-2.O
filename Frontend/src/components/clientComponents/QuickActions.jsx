import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiClipboard, FiMessageSquare, FiCalendar, FiZap } from "react-icons/fi";

const actionConfig = {
  "Find Counsellor": { icon: FiSearch, gradient: "from-blue-500 to-cyan-500", bgHover: "hover:bg-blue-50" },
  "Take Assessment": { icon: FiClipboard, gradient: "from-purple-500 to-pink-500", bgHover: "hover:bg-purple-50" },
  "Message": { icon: FiMessageSquare, gradient: "from-green-500 to-emerald-500", bgHover: "hover:bg-green-50" },
  "Book Session": { icon: FiCalendar, gradient: "from-amber-500 to-orange-500", bgHover: "hover:bg-amber-50" },
};

const QuickActions = ({ actions }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex-1 bg-white p-6 border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <FiZap className="text-white text-lg" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, idx) => {
          const config = actionConfig[action] || { icon: FiSearch, gradient: "from-gray-500 to-gray-600", bgHover: "hover:bg-gray-50" };
          const Icon = config.icon;
          return (
            <motion.button
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex items-center gap-3 px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-100 ${config.bgHover} hover:border-gray-200 hover:shadow-md transition-all duration-300 group`}
            >
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={16} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{action}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuickActions;
