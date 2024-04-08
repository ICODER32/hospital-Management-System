import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AppointmentForm from "../components/AppointmentForm";
import { PhoneCallbackRounded } from "@mui/icons-material";

export default function BookAppointment() {
  const [phone, setPhone] = useState("");
  const startCall = async () => {
    try {
      const response = await fetch("/api/calls/initiate-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverNumber: phone,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar role="patient" />
      <AppointmentForm />
      <h1 className=" text-center mt-20 text-4xl font-bold">
        Book Appointment
      </h1>
      <div className=" mt-6 w-full flex gap-10 flex-col items-center justify-center">
        {/* <span>Or</span> */}
        <div className="w-full flex items-center justify-center flex-col gap-5">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-4/5 border-2 border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter your phone Number"
          />
          <button className="px-6 flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded hover:bg-blue-700">
            <button onClick={startCall}>
              Get a Call
              <PhoneCallbackRounded />
            </button>
          </button>
        </div>
      </div>
    </div>
  );
}
