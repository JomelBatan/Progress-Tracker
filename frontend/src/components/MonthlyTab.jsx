export default function MonthlyTab({
  availableMonths,
  handleMonthSelect,
  selectedMonth,
}) {
  return (
    <div className="month-navigation mb-6 overflow-x-auto whitespace-nowrap flex flex-row justify-start md:justify-center">
      <div
        onClick={() => handleMonthSelect("Total")}
        className={`cursor-pointer inline-block px-4 py-2 border-b-2 ${
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
          className={`cursor-pointer inline-block px-4 py-2 border-b-2 ${
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
