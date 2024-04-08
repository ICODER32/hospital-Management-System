import React, { useEffect } from "react";
import AppointmentDetails from "./AppointmentDetails";
import moment from "moment";
import { useSelector } from "react-redux";

export default function Schedule() {
  const userId = useSelector((state) => state?.user?.user?.id);
  const [schedule, setSchedule] = React.useState([]);
  const [isHoliday, setIsHoliday] = React.useState(null);
  const timings = [
    {
      startTime: "9:00 AM",
      endTime: "9:50 AM",
      booked: false,
      date: Date.now(),
    },
    {
      startTime: "10:00 AM",
      endTime: "10:50 AM",
      booked: false,
      date: Date.now(),
    },
    {
      startTime: "11:00 AM",
      endTime: "11:50 AM",
      booked: false,
      date: Date.now(),
    },
    {
      startTime: "12:00 PM",
      endTime: "12:50 PM",
      booked: false,
      date: Date.now(),
    },
    {
      startTime: "1:00 PM",
      endTime: "1:50 PM",
      booked: false,
      date: Date.now(),
    },
    {
      startTime: "2:00 PM",
      endTime: "2:50 PM",
      booked: false,
      date: Date.now(),
    },
    {
      startTime: "3:00 PM",
      endTime: "3:50 PM",
      booked: false,
      date: Date.now(),
    },
    {
      startTime: "4:00 PM",
      endTime: "4:50 PM",
      booked: false,
      date: Date.now(),
    },
    {
      startTime: "5:00 PM",
      endTime: "5:50 PM",
      time: "5:00 PM",
      booked: false,
      date: Date.now(),
    },
    {
      startTime: "6:00 PM",
      endTime: "6:50 PM",
      booked: false,
      date: Date.now(),
    },
    {
      startTime: "7:00 PM",
      endTime: "7:50 PM",
      time: "7:00 PM",
      booked: false,
      date: Date.now(),
    },
    {
      startTime: "8:00 PM",
      endTime: "8:50 PM",
      booked: false,
      date: Date.now(),
    },
    {
      startTime: "9:00 PM",
      endTime: "9:50 PM",
      booked: false,
      date: Date.now(),
    },
  ];

  const getSchedule = async () => {
    try {
      let schedule = await fetch(`/api/doctorbreaks/?doctor_id=${userId}`);
      schedule = await schedule.json();

      if (schedule.length === 0) {
        setSchedule(timings);
      } else {
        let newSchedule = timings.map((time) => {
          let isBooked = false;
          let appointmentId = "";
          schedule.forEach((element) => {
            console.log(element, time);
            if (element.date !== element.endDate) {
              if (moment(time.date).isBetween(element.date, element.endDate)) {
                setIsHoliday(element);
              }
            }
            if (
              element.startTime === time.startTime &&
              element.endTime === time.endTime &&
              element.date === moment(time.date).format("YYYY-MM-DD")
            ) {
              isBooked = true;
              appointmentId = element._id;
            } else {
              // in 12 hour format
            }
          });
          return { ...time, booked: isBooked, appointmentId };
        });

        setSchedule(newSchedule);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const endBreak = async (appointmentId) => {
    console.log(appointmentId);
    try {
      await fetch(`/api/doctorbreaks/${appointmentId}`, {
        method: "DELETE",
      });
      getSchedule();
      setIsHoliday(null);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {isHoliday !== null ? (
        <div className="mt-20 flex flex-col items-center justify-center w-full">
          <div className="bg-blue-100 text-gray-700 p-6 w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-lg text-center">
            <h1 className="font-bold text-3xl mb-4">Holiday Status</h1>
            <p className="text-xl">
              Enjoy your break from{" "}
              <span className="font-semibold">
                {moment(isHoliday.date).format("DD-MM-YY")}
              </span>{" "}
              to{" "}
              <span className="font-semibold">
                {moment(isHoliday.endDate).format("DD-MM-YY")}
              </span>
            </p>
          </div>
          <button
            onClick={() => endBreak(isHoliday._id)}
            className="mt-4  p-3 bg-green-300 text-gray-700 rounded-md shadow-md hover:bg-green-400 transition duration-300"
          >
            End Holiday now
          </button>
        </div>
      ) : (
        <>
          <h1 className=" text-center text-2xl font-bold m-4">
            Todays's Schedule
          </h1>
          <div className="flex bg-slate-100  flex-col gap-2 p-6 rounded-lg">
            {schedule.map((time, index) => {
              return (
                <div
                  key={index}
                  className={`p-2 rounded-md ${
                    time.booked === false && "bg-green-300"
                  } ${time.booked === true && "bg-yellow-300"}`}
                >
                  <div className="flex items-center justify-between">
                    <p>
                      {time.startTime} - {time.endTime}{" "}
                    </p>
                    <p>{moment(time.date).format("DD-MM-YYYY")}</p>
                  </div>
                  <p className="font-bold">
                    {time.booked ? (
                      <AppointmentDetails appointment={time.appointmentId} />
                    ) : (
                      "Free Slot"
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
