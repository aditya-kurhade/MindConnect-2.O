import React from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiMessageCircle, FiVideo } from "react-icons/fi";

const TodaySchedule = ({ schedule }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <FiCalendar className="text-white text-lg" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
          <p className="text-sm text-gray-500">Your appointments for today</p>
        </div>
      </div>
      
      {schedule.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FiCalendar className="text-gray-400 text-2xl" />
          </div>
          <p className="text-gray-500 font-medium">No sessions scheduled for today</p>
        </div>
      ) : (
        <div className="space-y-3 mt-6">
          {schedule.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{s.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{s.session}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <FiClock className="text-blue-500" />
                      {s.time}
                    </span>
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
                      {s.duration}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 text-gray-700 font-medium text-sm rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 inline-flex items-center gap-1.5">
                    <FiMessageCircle size={14} />
                    Chat
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium text-sm rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-1.5">
                    <FiVideo size={14} />
                    Join
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TodaySchedule;
