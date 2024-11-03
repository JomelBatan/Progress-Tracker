export default function MonthlyTab({
  availableMonths,
  handleMonthSelect,
  selectedMonth,
}) {
  return (
    <div className="month-navigation mb-6 flex space-x-2 overflow-x-auto md:overflow-hidden whitespace-nowrap">
      <div
        onClick={() => handleMonthSelect("Total")}
        className={`cursor-pointer px-4 py-2 border-b-2 ${
          selectedMonth === "Total"
            ? "border-blue-500 text-blue-500"
            : "border-transparent text-gray-600"
        }`}
      >
        Total
      </div>

      {availableMonths.map((month) => (
        <div
          key={month}
          onClick={() => handleMonthSelect(month)}
          className={`cursor-pointer px-4 py-2 border-b-2 ${
            selectedMonth === month
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-600"
          }`}
        >
          {month}
        </div>
      ))}
    </div>
  );
}
