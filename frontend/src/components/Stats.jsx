import React from "react";

export default function Stats() {
  return (
    <div className="stats shadow mb-8">
      <div className="stat place-items-center">
        <div className="stat-title">Day Passed</div>
        <div className="stat-value">0</div>
        <div className="stat-desc">From November 1st to 30th</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Successful</div>
        <div className="stat-value text-secondary">0</div>
        <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Relapse</div>
        <div className="stat-value">0</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>
  );
}
