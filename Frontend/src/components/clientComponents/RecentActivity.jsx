import React from "react";
import { motion } from "framer-motion";
import { FiActivity } from "react-icons/fi";

const RecentActivity = ({ activities }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="flex-1 bg-white p-6 border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
          <FiActivity className="text-white text-lg" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
      </div>
      <ul className="space-y-3">
        {activities.map((activity, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md hover:border-green-100 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                {activity.icon}
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-800 block">
                  {activity.text}
                </span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default RecentActivity;

