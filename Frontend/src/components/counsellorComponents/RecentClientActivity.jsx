import React from "react";

const RecentClientActivity = ({ clients, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Client Activity</h2>
      </div>
      {clients.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No clients yet</p>
      ) : (
        <div className="space-y-4">
          {clients.map((c, idx) => (
            <div key={idx} className="flex justify-between items-center p-4 border rounded-xl">
              <div>
                <h3 className="font-medium text-lg">{c.name}</h3>
                <p className="text-sm text-gray-500">{c.issue}</p>
                <p className="text-sm text-gray-500">📞 {c.phone} | ✉️ {c.email}</p>
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
                    onClick={() => onEdit(idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 text-xs"
                    onClick={() => onDelete(idx)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentClientActivity;
