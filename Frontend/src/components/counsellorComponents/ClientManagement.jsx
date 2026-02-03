import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiUsers, FiPhone, FiMail } from "react-icons/fi";

const ClientManagement = ({ clients, onAddClient, onEditClient, onDeleteClient }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
            <FiUsers className="text-white text-lg" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Client Management</h3>
        </div>
        <button
          onClick={onAddClient}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <FiPlus size={18} />
          Add Client
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search clients by name, issue, phone or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Client List */}
      {filteredClients.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <FiUsers className="text-gray-400 text-2xl" />
          </div>
          <p className="text-gray-500 font-medium">No clients found</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your search or add a new client</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredClients.map((c, idx) => (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900 text-lg">{c.name}</h4>
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
                    onClick={() => onEditClient(idx)}
                    title="Edit"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    className="w-9 h-9 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                    onClick={() => onDeleteClient(idx)}
                    title="Delete"
                  >
                    <FiTrash2 size={16} />
                  </button>
                  <button
                    className="w-9 h-9 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                    onClick={() => window.open(`/client/${c.id}`, "_blank")}
                    title="View"
                  >
                    <FiExternalLink size={16} />
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

export default ClientManagement;
