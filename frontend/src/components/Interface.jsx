import React, { useEffect, useState } from "react";

export default function Interface({ data, addDay, isSubmitting }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (data.total > 0) {
      setValue(Math.round((data.success / data.total) * 100));
    } else {
      setValue(0);
    }
  }, [data]);

  const progressColor =
    value > 75
      ? "text-green-500"
      : value > 50
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative mb-8">
        <div
          id="progress"
          className={`absolute radial-progress text-gray-300 mb-4`}
          style={{ "--value": 100, "--size": "12rem", "--thickness": "2rem" }}
          role="progressbar"
        ></div>
        <div
          id="progress"
          className={`radial-progress ${progressColor} mb-4 stat-value`}
          style={{ "--value": value, "--size": "12rem", "--thickness": "2rem" }}
          role="progressbar"
        >
          {`${value}%`}
        </div>
      </div>
      <div className="btn-container flex space-x-4">
        <button
          className="day bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          id="oneday"
          disabled={isSubmitting}
          onClick={() => addDay("success")}
          aria-label="Add a successful day"
        >
          Good Day
        </button>
        <button
          className="day bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          id="badday"
          disabled={isSubmitting}
          onClick={() => addDay("fail")}
          aria-label="Add a failed day"
        >
          Bad Day
        </button>
      </div>
    </div>
  );
}
