import React from "react";
import { Search, ClipboardList, MessageSquare, Calendar } from "lucide-react";

const iconMap = {
  "Find Counsellor": Search,
  "Take Assessment": ClipboardList,
  "Message": MessageSquare,
  "Book Session": Calendar,
};

const QuickActions = ({ actions }) => {
  return (
    <div className="flex-1 bg-white p-6 border-1 border-gray-300 p-6 rounded-xl ">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="flex flex-wrap gap-4">
        {actions.map((action, idx) => {
          const Icon = iconMap[action] || Search; // fallback icon
          return (
            <button
              key={idx}
              className="flex-1 min-w-[140px] flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <Icon size={18} className="text-black" />
              <span className="text-sm font-medium">{action}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
