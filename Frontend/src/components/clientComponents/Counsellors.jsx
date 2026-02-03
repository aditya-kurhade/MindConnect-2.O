import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { FiMessageCircle, FiUsers } from "react-icons/fi";

const Counsellors = ({ counsellors }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <FiUsers className="text-white text-lg" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Your Counsellors</h2>
      </div>
      <div className="space-y-3">
        {counsellors.map((c, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-md hover:border-purple-100 transition-all duration-300 group"
          >
            <div className="relative">
              <img
                src={c.image}
                alt={c.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{c.name}</h3>
              <p className="text-sm text-gray-500">{c.specialty}</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xs ${
                        i < Math.floor(c.rating) ? "text-amber-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700 ml-1">{c.rating}</span>
              </div>
            </div>

            <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              <FiMessageCircle size={18} />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Counsellors;
