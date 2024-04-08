import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AssignAppointment() {
  const [appointment, setAppointment] = React.useState({}); // [{}
  const [doctors, setDoctors] = React.useState([]); // [{}
  const params = useParams();
  const id = params.id;
  const getAppointment = async () => {
    try {
      const response = await fetch(`/api/appointment/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setAppointment(data);
        getDoctorSuggestions(
          data.doctorType,
          data.appointmentTime,
          data.appointmentDate
        );
      }
      if (!response.ok) {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const getDoctorSuggestions = async (doctorType, appointmentTime, date) => {
    // use query to send request to backend
    // /api/doctor?doctorType=doctorType&appointmentTime=appointmentTime
    console.log(doctorType, appointmentTime, date);
    try {
      const response = await fetch(
        `/api/doctor/suggest?type=${doctorType}&time=${appointmentTime}&date=${date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setDoctors(data);
      }
      if (!response.ok) {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const confirmAppointment = async (doctorId) => {
    try {
      const response = await fetch(`/api/appointment/${appointment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doctor_id: doctorId }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert(data.message);
      }
      if (!response.ok) {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  React.useEffect(() => {
    getAppointment();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navbar role="admin" />
      <div class="max-w-4xl mx-auto my-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">
          Assign Appointment
        </h1>
        <div class="bg-white shadow-md rounded-lg p-6 mb-8">
          <div class="grid grid-cols-2 gap-4 mb-4">
            <p class="text-gray-600">
              Appointment Date:{" "}
              <span class="ml-2 text-gray-800">
                {appointment?.appointmentDate}
              </span>
            </p>
            <p class="text-gray-600">
              Appointment Time:{" "}
              <span class="ml-2 text-gray-800">
                {appointment?.appointmentTime} hrs
              </span>
            </p>
            <p class="text-gray-600">
              Phone Number:{" "}
              <span class="ml-2 text-gray-800">
                {appointment?.patient_id?.phoneNumber}
              </span>
            </p>
            <p class="text-gray-600">
              Doctor Type:{" "}
              <span class="ml-2 text-gray-800">{appointment?.doctorType}</span>
            </p>
          </div>
        </div>

        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          Suggested Doctor(s)
        </h1>

        <div class="bg-white shadow-md rounded-lg p-4">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  First Name
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Last Name
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Phone
                </th>
                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => {
                if (doctor == null) {
                  return <></>;
                }
                return (
                  <tr class="hover:bg-gray-100">
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {doctor?.firstName}
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {doctor?.lastName}
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <a
                        href="mailto:{doctor.email}"
                        class="text-blue-500 hover:text-blue-600 underline"
                      >
                        {doctor?.email}
                      </a>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {doctor?.phone}
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => confirmAppointment(doctor._id)}
                        class="text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
