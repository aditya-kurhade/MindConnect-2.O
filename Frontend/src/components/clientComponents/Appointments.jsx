import React from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiVideo, FiChevronRight } from "react-icons/fi";

const Appointments = ({ appointments }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 bg-white border border-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <FiCalendar className="text-white text-lg" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
        </div>
        <button className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors duration-200">
          View All
          <FiChevronRight className="text-sm" />
        </button>
      </div>
      <div className="space-y-3">
        {appointments.map((appt, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 flex items-center gap-4 hover:shadow-md hover:border-blue-100 transition-all duration-300 group"
          >
            <div className="relative">
              <img
                src={appt.img}
                alt={appt.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{appt.name}</h3>
              <p className="text-sm text-gray-500">{appt.specialty}</p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <FiClock className="text-blue-500" />
                  {appt.time}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium">
                  <FiVideo className="text-xs" />
                  {appt.type}
                </span>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105">
              Join
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Appointments;
