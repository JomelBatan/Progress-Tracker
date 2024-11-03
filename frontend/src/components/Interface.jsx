import React from "react";

export default function Interface() {
  return (
    <>
      <div className="relative">
        <div
          id="progress"
          className="absolute radial-progress text-gray-400 mb-8"
          style={{ "--value": 100, "--size": "12rem", "--thickness": "2rem" }}
          role="progressbar"
        ></div>
        <div
          id="progress"
          className="radial-progress text-primary mb-8 stat-value"
          style={{ "--value": 0, "--size": "12rem", "--thickness": "2rem" }}
          role="progressbar"
        >
          0%
        </div>
      </div>
      <div className="btn-container flex space-x-4">
        <button
          className="day bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          id="oneday"
        >
          Good Day
        </button>
        <button
          className="day bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          id="badday"
        >
          Bad Day
        </button>
      </div>
    </>
  );
}
