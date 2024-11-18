import { useEffect, useRef, useState } from "react";
import Stats from "./components/Stats";
import Interface from "./components/Interface";
import { supabase } from "./supabaseClient";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import MonthTab from "./components/MonthlyTab";
import CalendarTable from "./components/Calendar";
import Navbar from "./components/NavBar";
import { FaCalendarAlt } from "react-icons/fa";

function App() {
  const [days, setDays] = useState([]);
  const [stats, setStats] = useState({ total: 0, success: 0, fail: 0 });
  const [streak, setStreak] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastClickRef = useRef(0);
  const throttleDelay = 1000;
  useEffect(() => {
    fetchAllDays();

    const subscription = supabase
      .channel("realtime:MyTracker")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "MyTracker" },
        () => {
          fetchAllDays();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchAllDays() {
    const { data, error } = await supabase.from("MyTracker").select("*");

    if (error) {
      console.error("Error fetching days:", error);
      return;
    }

    if (data) {
      setDays(data);
      calculateStats(data);
      calculateStreak(data);
      extractAvailableMonths(data);

      if (data.length > 0) {
        const firstDate = new Date(data[0].created_at);
        const defaultMonth = firstDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        setSelectedMonth(defaultMonth);
        fetchDays(defaultMonth);
      }
    }
  }

  function extractAvailableMonths(data) {
    const monthsSet = new Set();

    data.forEach((day) => {
      const createdAt = new Date(day.created_at);
      const monthYear = createdAt.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      monthsSet.add(monthYear);
    });

    const sortedMonths = [...monthsSet].sort((a, b) => {
      const dateA = new Date(`1 ${a}`);
      const dateB = new Date(`1 ${b}`);
      return dateB - dateA;
    });

    setAvailableMonths(sortedMonths);
  }

  async function fetchDays(month) {
    let query = supabase.from("MyTracker").select("*");

    // Handle fetching data for the "Total" tab
    if (month && month !== "Total") {
      const [monthName, year] = month.split(" ");
      const start = new Date(
        year,
        new Date(Date.parse(monthName + " 1")).getMonth(),
        1
      );
      const end = new Date(
        year,
        new Date(Date.parse(monthName + " 1")).getMonth() + 1,
        0,
        23,
        59,
        59
      );

      query = query
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString());

      const startDay = new Date(start).getDate();
      const endDay = new Date(end).getDate();

      setStartDate(startDay);
      setEndDate(endDay);
    } else {
      setStartDate(null);
      setEndDate(null);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching days:", error);
      return;
    }

    if (data) {
      setDays(data);
      calculateStats(data);
      calculateStreak(data);
    }
  }

  async function addDay(status) {
    const now = Date.now();
    if (now - lastClickRef.current < throttleDelay) {
      toast.error("Please wait before clicking again.");
      return;
    }
    lastClickRef.current = now;
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const today = new Date().toISOString().split("T")[0];

      const dayExists = days.some((day) => day.date === today);
      if (dayExists) {
        toast.error("A record for today already exists!");
        return;
      }

      const { data, error } = await supabase
        .from("MyTracker")
        .insert([{ date: today, status }]);

      if (error) {
        toast.error("Error adding day:", error.message);
        return;
      }

      if (data && data[0]) {
        const newDays = [...days, data[0]];
        setDays(newDays);
        calculateStats(newDays);
        calculateStreak(newDays);

        toast.success(`You recorded a ${status} day!`);
      }
    } catch (e) {
      toast.error(`Unexpected error: ${e.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  function calculateStats(data) {
    const total = data.length;
    const success = data.filter((day) => day.status === "success").length;
    const fail = data.filter((day) => day.status === "fail").length;

    setStats({ total, success, fail });
  }

  function calculateStreak(data) {
    let currentStreak = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].status === "success") {
        currentStreak++;
      } else {
        break;
      }
    }
    setStreak(currentStreak);
  }

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    fetchDays(month);
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <MonthTab
        availableMonths={availableMonths}
        handleMonthSelect={handleMonthSelect}
        selectedMonth={selectedMonth}
      />
      <div className="flex items-center justify-center flex-col relative py-4">
        <button
          className="absolute right-4 top-72 md:top-28 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => setShowCalendar((prev) => !prev)}
        >
          <FaCalendarAlt />
        </button>

        <Stats
          data={{ ...stats, streak }}
          dateRange={
            startDate || endDate
              ? `${
                  selectedMonth.split(" ")[0]
                } ${startDate} - ${endDate}, ${selectedMonth
                  .split(" ")
                  .slice(1)
                  .join(" ")}`
              : `Overall`
          }
        />
        <div className="flex flex-col md:flex-row-reverse">
          <Interface data={stats} addDay={addDay} isSubmitting={isSubmitting} />
          {showCalendar && (
            <CalendarTable data={days} selectedMonth={selectedMonth} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
