import React from "react";

const RecentActivity = ({ activities }) => {
  return (
    <div className="flex-1 bg-white p-6 border border-gray-200 rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-8">Recent Activity</h2>
      <ul className="space-y-4">
        {activities.map((activity, idx) => (
          <li key={idx}>
            <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 justify-center text-blue-600 text-lg">
              {activity.icon}
            </div>

            {/* Text + Time stacked */}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">
                {activity.text}
              </span>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;

