import React from "react";
import { motion } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiClock, FiUser, FiCalendar } from "react-icons/fi";

const Appointments = ({ schedule, onAddAppointment, onEditAppointment, onDeleteAppointment }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <FiCalendar className="text-white text-lg" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Appointments</h3>
        </div>
        <button
          onClick={onAddAppointment}
          className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <FiPlus className="text-lg" />
        </button>
      </div>

      {schedule.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FiCalendar className="text-gray-400 text-2xl" />
          </div>
          <p className="text-gray-500 font-medium">No appointments scheduled</p>
          <p className="text-gray-400 text-sm mt-1">Click the + button to add one</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {schedule.map((a, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md hover:border-green-100 transition-all duration-300 group"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-lg">{a.session}</h4>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <FiUser className="text-blue-500" />
                      {a.name}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <FiClock className="text-green-500" />
                      {a.time}
                    </span>
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
                      {a.duration}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    className="w-9 h-9 bg-amber-500 text-white rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors"
                    onClick={() => onEditAppointment(idx)}
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    className="w-9 h-9 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                    onClick={() => onDeleteAppointment(idx)}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default Appointments;
