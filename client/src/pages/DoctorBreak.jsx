import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { X } from "lucide-react";
import Calendar from "../components/Calender";

export default function DoctorBreak() {
  const userId = useSelector((state) => state?.user?.user?.id);
  const [startTime, setStartTime] = React.useState("9:00 AM");
  const [endTime, setEndTime] = React.useState("9:50 AM");
  const [date, setDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [events, setEvents] = React.useState([]);
  const [showBreakForm, setShowBreakForm] = React.useState(false);

  const startTimes = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
  ];
  const endTimes = [
    "9:50 AM",
    "10:50 AM",
    "11:50 AM",
    "12:50 PM",
    "1:50 PM",
    "2:50 PM",
    "3:50 PM",
    "4:50 PM",
    "5:50 PM",
    "6:50 PM",
    "7:50 PM",
    "8:50 PM",
    "9:50 PM",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/doctorbreaks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startTime,
          endTime,
          date,
          endDate,
          reason,
          doctor_id: userId,
        }),
      });
      await response.json();
      alert("Submitted successfully for Review");
      setReason("");
      setDate("");
    } catch (error) {
      console.log(error);
    }
  };

  const getEvents = async () => {
    try {
      let events = await fetch(`/api/doctorbreaks/?doctor_id=${userId}`);
      events = await events.json();
      setEvents(events);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar role={"doctor"} />
      <div className=" flex items-center justify-end m-10">
        <Button
          onClick={() => {
            setShowBreakForm(true);
          }}
          variant="contained"
        >
          Add Break
        </Button>
      </div>
      {showBreakForm && (
        <div className="container  mx-auto p-4">
          <div className="max-w-xl relative mx-auto p-8 bg-white shadow-md rounded-lg">
            <X
              className="cursor-pointer hover:bg-gray-400 hover:text-black rounded-md transition-all absolute top-2 right-1 m-2"
              onClick={() => setShowBreakForm(false)}
            />
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Take a break
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <input
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  type="date"
                  name="date"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <input
                  onChange={(e) => setEndDate(e.target.value)}
                  value={endDate}
                  type="date"
                  name="date"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Time
                </label>
                <select
                  onChange={(e) => setStartTime(e.target.value)}
                  name="start time"
                  id="startTime"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  {startTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Time
                </label>
                <select
                  onChange={(e) => setEndTime(e.target.value)}
                  value={endTime}
                  name="end time"
                  id="endTime"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  {endTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reason
                </label>
                <textarea
                  onChange={(e) => setReason(e.target.value)}
                  value={reason}
                  name="reason"
                  placeholder="Reason for taking a break"
                  id="reason"
                  cols="30"
                  rows="3"
                  className="w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></textarea>
              </div>
              <input
                type="submit"
                value="Submit"
                className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
              />
            </form>
          </div>
        </div>
      )}
      <Calendar events={events} />
    </>
  );
}
