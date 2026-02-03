import React from "react";
import { motion } from "framer-motion";
import { FiActivity, FiEdit2, FiTrash2, FiPhone, FiMail } from "react-icons/fi";

const RecentClientActivity = ({ clients, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <FiActivity className="text-white text-lg" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Recent Client Activity</h2>
      </div>

      {clients.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FiActivity className="text-gray-400 text-2xl" />
          </div>
          <p className="text-gray-500 font-medium">No recent activity</p>
          <p className="text-gray-400 text-sm mt-1">Client activity will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {clients.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md hover:border-amber-100 transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{c.name}</h3>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        c.status === "active"
                          ? "bg-green-100 text-green-700"
                          : c.status === "scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{c.issue}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <FiPhone className="text-blue-500" size={14} />
                      {c.phone}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FiMail className="text-purple-500" size={14} />
                      {c.email}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Last session: {c.last}</p>
                </div>
                <div className="flex sm:flex-col items-center gap-2">
                  <button
                    className="w-9 h-9 bg-amber-500 text-white rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors"
                    onClick={() => onEdit(idx)}
                    title="Edit"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    className="w-9 h-9 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                    onClick={() => onDelete(idx)}
                    title="Delete"
                  >
                    <FiTrash2 size={16} />
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

export default RecentClientActivity;
