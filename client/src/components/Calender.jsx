import { Calendar, globalizeLocalizer } from "react-big-calendar";
import globalize from "globalize";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useEffect } from "react";
const localizer = globalizeLocalizer(globalize);
// Add event for 26 january 2024
// add time for 9:00 AM to 9:50 AM

const MyCalendar = (props) => {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const formatEvents = () => {
    const events = props?.events?.map((event) => {
      let year = event.date.split("-")[0];
      let month = parseInt(event.date.split("-")[1]) - 1;
      let day = event.date.split("-")[2];
      let startTime = event.startTime.split(" ")[0];
      let endTime = event.endTime.split(" ")[0];
      return {
        title: event.reason,
        start: new Date(year, month, day, startTime.split(":")[0], 0, 0),
        end: new Date(year, month, day, endTime.split(":")[0], 50, 0),
      };
    });
    setEvents(events);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    formatEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div className=" p-12">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;
