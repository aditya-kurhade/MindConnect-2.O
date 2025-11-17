import React from "react";


const StatsSection = ({ stats }) => {
  return (
    <div className="flex flex-wrap gap-6 mb-8">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="flex-1 bg-white p-6 rounded-lg border-1 border-gray-300"
        >
          <h2 className="text-md text-gray-600">{item.title}</h2>

          {item.title === "Wellness Score" ? (
            <div>
              <p className="text-2xl font-bold text-green-600 m-2 text-left">
                {item.value}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="h-4 bg-black rounded-full transition-all duration-700"
                  style={{ width: item.value }}
                ></div>
              </div>
            </div>
          ) : (
            <>
              <p className={`text-xl font-bold m-2 ${item.color || ""}`}>
                {item.value}
              </p>
              {item.sub && (
                <p className="text-sm text-green-600 mt-1">{item.sub}</p>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
