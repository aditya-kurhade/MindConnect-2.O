import React from "react";
import { motion } from "framer-motion";
import { FiBarChart2, FiTrendingUp, FiPieChart, FiActivity } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

const Analytics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-center"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />
      
      <div className="relative">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
          <FiBarChart2 className="text-white text-3xl" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3">Analytics Dashboard</h2>
        <p className="text-purple-100 mb-8 max-w-md mx-auto">
          Comprehensive analytics and insights to track your practice performance and client progress.
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: FiTrendingUp, label: "Growth Trends" },
            { icon: FiPieChart, label: "Session Stats" },
            { icon: FiActivity, label: "Client Progress" },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
            >
              <item.icon className="text-white text-xl mx-auto mb-2" />
              <p className="text-purple-100 text-xs font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
        
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl">
          <HiSparkles />
          View Reports
        </button>
      </div>
    </motion.div>
  );
};

export default Analytics;
