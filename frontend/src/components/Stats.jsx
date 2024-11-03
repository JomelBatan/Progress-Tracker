import React from "react";
import { BsFire } from "react-icons/bs";
import { FaVolcano } from "react-icons/fa6";
import { MdSelfImprovement } from "react-icons/md";

export default function Stats({ data, dateRange }) {
  const successRate = ((data.success / data.total) * 100).toFixed(2) || 0;
  const failRate = ((data.fail / data.total) * 100).toFixed(2) || 0;
  const hasStreak = data.streak >= 1;

  return (
    <div
      className={`shadow mb-8 grid gap-4 p-4 ${
        hasStreak ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"
      }`}
    >
      <div className="stat place-items-center bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition">
        <div className="stat-title text-gray-500">Days Passed</div>
        <div className="stat-value text-2xl font-bold">{data.total}</div>
        <div className="stat-desc text-gray-400">{dateRange}</div>
      </div>

      <div className="stat place-items-center bg-green-100 rounded-lg p-4 shadow-md hover:shadow-lg transition">
        <div className="stat-title text-gray-500">Successful Days</div>
        <div className="flex flex-row space-x-2 items-center">
          <div className="stat-value text-2xl font-bold text-green-600">
            {data.success}
          </div>
          <MdSelfImprovement className="h-8 w-6 text-green-600" />
        </div>
        <div className="stat-desc">
          <span
            className="tooltip tooltip-bottom text-gray-400"
            data-tip={`Success Rate: ${successRate}%`}
          >
            {`${successRate}%`}{" "}
            <span className="text-gray-400">{`${data.success} days`}</span>
          </span>
        </div>
      </div>

      <div className="stat place-items-center bg-red-100 rounded-lg p-4 shadow-md hover:shadow-lg transition">
        <div className="stat-title text-gray-500">Relapse Days</div>
        <div className="flex flex-row space-x-2 items-center">
          <div className="stat-value text-2xl font-bold text-red-600">
            {data.fail}
          </div>
          <FaVolcano className="h-8 w-4 text-red-600" />
        </div>
        <div className="stat-desc">
          <span
            className="tooltip tooltip-bottom text-gray-400"
            data-tip={`Fail Rate: ${failRate}%`}
          >
            {`${failRate}%`}{" "}
            <span className="text-gray-400">{`${data.fail} days`}</span>
          </span>
        </div>
      </div>

      {hasStreak && (
        <div className="stat place-items-center bg-orange-100 rounded-lg p-4 shadow-md hover:shadow-lg transition">
          <div className="stat-title text-gray-500">Current Streak</div>
          <div className="flex flex-row space-x-2 items-center">
            <div className="stat-value text-2xl text-orange-400">
              {data.streak}
            </div>
            <BsFire className="h-8 w-4 text-orange-400" />
          </div>
          <div className="stat-desc text-gray-400">
            Success Consecutive Days
          </div>
        </div>
      )}
    </div>
  );
}

// export default function Stats({ data, dateRange }) {
//   const successRate = ((data.success / data.total) * 100).toFixed(2) || 0;
//   const failRate = ((data.fail / data.total) * 100).toFixed(2) || 0;

//   return (
//     <div className="shadow mb-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
//       <div className="stat place-items-center bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition">
//         <div className="stat-title text-gray-500">Days Passed</div>
//         <div className="stat-value text-2xl font-bold">{data.total}</div>
//         <div className="stat-desc text-gray-400">{dateRange}</div>
//       </div>

//       <div className="stat place-items-center bg-green-100 rounded-lg p-4 shadow-md hover:shadow-lg transition">
//         <div className="stat-title text-gray-500">Successful Days</div>
//         <div className="stat-value text-2xl font-bold text-green-600">
//           {data.success}
//         </div>
//         <div className="stat-desc">
//           <span
//             className="tooltip tooltip-bottom text-gray-400"
//             data-tip={`Success Rate: ${successRate}%`}
//           >
//             {`${successRate}%`}{" "}
//             <span className="text-gray-400">{`${data.success} days`}</span>
//           </span>
//         </div>
//       </div>

//       <div className="stat place-items-center bg-red-100 rounded-lg p-4 shadow-md hover:shadow-lg transition">
//         <div className="stat-title text-gray-500">Relapse Days</div>
//         <div className="stat-value text-2xl font-bold text-red-600">
//           {data.fail}
//         </div>
//         <div className="stat-desc">
//           <span
//             className="tooltip tooltip-bottom text-gray-400"
//             data-tip={`Fail Rate: ${failRate}%`}
//           >
//             {`${failRate}%`}{" "}
//             <span className="text-gray-400">{`${data.fail} days`}</span>
//           </span>
//         </div>
//       </div>

//       {data.streak >= 1 && (
//         <div className="stat place-items-center bg-orange-100 rounded-lg p-4 shadow-md hover:shadow-lg transition">
//           <div className="stat-title text-gray-500">Current Streak</div>
//           <div className="stat-value text-2xl text-orange-400">
//             {data.streak}
//           </div>
//           <div className="stat-desc text-gray-400">
//             Successful Days in a Row
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
