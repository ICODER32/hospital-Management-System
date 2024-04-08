import React from "react";

export default function AppointmentDetails({ appointment }) {
  const [appointmentDetails, setAppointmentDetails] = React.useState(null);
  const getAppointmentDetails = async () => {
    try {
      const response = await fetch(`/api/doctorbreaks/${appointment}`);
      const data = await response.json();
      console.log(data);
      setAppointmentDetails(data);
    } catch (error) {}
  };
  React.useEffect(() => {
    getAppointmentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <p>{appointmentDetails?.reason}</p>
    </div>
  );
}
