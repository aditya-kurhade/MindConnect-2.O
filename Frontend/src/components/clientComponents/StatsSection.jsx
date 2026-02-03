import React from "react";
import { motion } from "framer-motion";
import { FiHeart, FiCalendar, FiMessageCircle, FiTrendingUp } from "react-icons/fi";

const iconMap = {
  "Wellness Score": { icon: FiHeart, gradient: "from-green-500 to-emerald-500" },
  "Sessions": { icon: FiCalendar, gradient: "from-blue-500 to-cyan-500" },
  "Messages": { icon: FiMessageCircle, gradient: "from-purple-500 to-pink-500" },
  "Progress": { icon: FiTrendingUp, gradient: "from-amber-500 to-orange-500" },
};

const StatsSection = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((item, idx) => {
        const config = iconMap[item.title] || { icon: FiTrendingUp, gradient: "from-gray-500 to-gray-600" };
        const Icon = config.icon;
        
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="text-white text-lg" />
              </div>
              <h2 className="text-sm font-medium text-gray-500">{item.title}</h2>
            </div>

            {item.title === "Wellness Score" ? (
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-3">
                  {item.value}
                </p>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: item.value }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                  />
                </div>
              </div>
            ) : (
              <>
                <p className={`text-3xl font-bold ${item.color || "text-gray-900"}`}>
                  {item.value}
                </p>
                {item.sub && (
                  <p className="text-sm text-green-600 font-medium mt-2 flex items-center gap-1">
                    <FiTrendingUp className="text-xs" />
                    {item.sub}
                  </p>
                )}
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsSection;
