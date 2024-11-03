import React from "react";

const CalendarTable = ({ data, selectedMonth }) => {
  if (!selectedMonth) {
    return <div>Loading...</div>;
  }

  const parseSelectedMonth = (selectedMonth) => {
    const [monthName, year] = selectedMonth.split(" ");
    const month = new Date(Date.parse(monthName + " 1, " + year)).getMonth();
    return { month, year: parseInt(year, 10) };
    r;
  };

  const { month, year } = parseSelectedMonth(selectedMonth);

  const renderCalendar = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const weeks = [];
    let currentWeek = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      currentWeek.push(<td key={`empty-${i}`} className="border p-4"></td>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${
        day < 10 ? `0${day}` : day
      }`;
      const dayData = data.find((item) => item.date === date);

      const bgColor = dayData
        ? dayData.status === "success"
          ? "bg-green-200 text-green-900"
          : dayData.status === "fail"
          ? "bg-red-200 text-red-900"
          : ""
        : "";

      currentWeek.push(
        <td key={day} className={`border p-4 text-center ${bgColor}`}>
          {day}
        </td>
      );
      if (currentWeek.length === 7) {
        weeks.push(<tr key={`week-${weeks.length}`}>{currentWeek}</tr>);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(
          <td
            key={`empty-end-${currentWeek.length}`}
            className="border p-4"
          ></td>
        );
      }
      weeks.push(<tr key={`week-${weeks.length}`}>{currentWeek}</tr>);
    }

    return weeks;
  };

  return (
    <div className="overflow-x-auto p-8">
      <table className="min-w-full border-collapse border text-gray-600 border-gray-200 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border p-2 font-semibold">Sun</th>
            <th className="border p-2 font-semibold">Mon</th>
            <th className="border p-2 font-semibold">Tue</th>
            <th className="border p-2 font-semibold">Wed</th>
            <th className="border p-2 font-semibold">Thu</th>
            <th className="border p-2 font-semibold">Fri</th>
            <th className="border p-2 font-semibold">Sat</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>
  );
};

export default CalendarTable;
