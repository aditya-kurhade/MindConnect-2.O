import React, { useState } from "react";
import { FaEye, FaSearch } from "react-icons/fa";

const ClientManagement = ({ clients, onAddClient, onEditClient, onDeleteClient }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter clients by name, issue, phone, or email
  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white shadow rounded-xl space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Clients</h3>
        <button
          onClick={onAddClient}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Client
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      {/* Client List */}
      {filteredClients.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No clients found</p>
      ) : (
        <ul className="space-y-3">
          {filteredClients.map((c, idx) => (
            <li
              key={c.id}
              className="p-4 border rounded-xl flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium text-lg">{c.name}</h4>
                <p className="text-sm text-gray-500">{c.issue}</p>
                <p className="text-sm text-gray-500">
                  📞 {c.phone} | ✉️ {c.email}
                </p>
                <p className="text-xs text-gray-400">Last session: {c.last}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    c.status === "active"
                      ? "bg-green-600 text-white"
                      : c.status === "scheduled"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {c.status}
                </span>
                <div className="flex space-x-2">
                  <button
                    className="px-2 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600 text-xs"
                    onClick={() => onEditClient(idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 text-xs"
                    onClick={() => onDeleteClient(idx)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-2 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 text-xs flex items-center gap-1"
                    onClick={() => window.open(`/client/${c.id}`, "_blank")}
                  >
                    <FaEye /> View
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientManagement;
