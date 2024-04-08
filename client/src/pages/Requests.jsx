import Navbar from "../components/Navbar";

import React, { useEffect, useState } from "react";

export default function Requests() {
  const [doctors, setDoctors] = useState([]);

  const getPendingBreaks = async () => {
    try {
      const response = await fetch("/api/doctorbreaks/pending");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPendingBreaks();
  }, []);

  const approveRequest = async (id) => {
    try {
      const response = await fetch(`/api/doctorbreaks/approve/${id}`);
      await response.json();
      getPendingBreaks();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectRequest = async (id) => {
    try {
      const response = await fetch(`/api/doctorbreaks/reject/${id}`);
      await response.json();
      getPendingBreaks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar role="admin" />
      <div className="flex items-center justify-center mt-10">
        <div className="flex flex-col p-10 gap-9 bg-gray-100 shadow-md rounded-md w-11/12 mt-2 items-center justify-around">
          <div className="flex-col md:flex-row gap-10 w-full flex items-center justify-around">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold">Pending Requests</h1>
            </div>
          </div>
          <div className="w-full">
            <table className="min-w-full bg-white">
              <thead className="bg-green-300">
                <tr>
                  <th className="py-2 px-4">Doctor Name</th>
                  <th className="py-2 px-4" align="right">
                    Email
                  </th>
                  <th className="py-2 px-4" align="right">
                    Phone
                  </th>
                  <th className="py-2 px-4" align="right">
                    From
                  </th>
                  <th className="py-2 px-4" align="right">
                    To
                  </th>
                  <th className="py-2 px-4" align="right">
                    Reason
                  </th>
                  <th className="py-2 px-4" align="right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {doctors.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-400">
                      No Pending Requests
                    </td>
                  </tr>
                )}
                {doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td className="py-2 px-4">
                      {doctor.doctor_id.firstName} {doctor.doctor_id.lastName}
                    </td>
                    <td className="py-2 px-4" align="right">
                      {doctor.doctor_id.email}
                    </td>
                    <td className="py-2 px-4" align="right">
                      {doctor.doctor_id.phone}
                    </td>
                    <td className="py-2 px-4" align="right">
                      {doctor.date} ({doctor.startTime})
                    </td>
                    <td className="py-2 px-4" align="right">
                      {doctor.endDate} ({doctor.endTime})
                    </td>
                    <td className="py-2 px-4" align="right">
                      {doctor.reason}
                    </td>
                    <td className="py-2 px-4" align="right">
                      <button
                        onClick={() => approveRequest(doctor._id)}
                        className="bg-green-300 hover:bg-green-400 text-white py-2 px-4 rounded-md"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectRequest(doctor._id)}
                        className="bg-red-300 hover:bg-red-400 text-white py-2 px-4 rounded-md"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
