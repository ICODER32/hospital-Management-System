import React, { useState } from "react";
import Alert from "@mui/material/Alert";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    address: "",
    phoneNumber: "",
    appointmentDate: "",
    doctorType: "",
    hasDentalInsurance: false,
    insuranceName: "",
    insuranceNumber: "",
    lastXRayDate: "",
    appointmentTime: "",
  });
  const [alert, setAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your submit logic here
    try {
      const response = await fetch("/api/appointment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await response.json();
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 3000);
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        address: "",
        phoneNumber: "",
        appointmentDate: "",
        doctorType: "",
        hasDentalInsurance: false,
        insuranceName: "",
        insuranceNumber: "",
        lastXRayDate: "",
        appointmentTime: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {alert && (
        <Alert className=" m-3" variant="filled" severity="success">
          Your Request for Appointment has been sent.
        </Alert>
      )}

      <div className="container mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          {/* First Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="age"
              type="number"
              placeholder="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="tel"
              placeholder="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          {/* Appointment Date */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="appointmentDate"
            >
              Appointment Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="appointmentDate"
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="appointmentTime"
            >
              Appointment Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="appointmentTime"
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
            />
          </div>

          {/* Doctor Type */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="doctorType"
            >
              Which Doctor's Appointment
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="doctorType"
              name="doctorType"
              value={formData.doctorType}
              onChange={handleChange}
            >
              <option value="">Select Doctor</option>
              <option value="General">General</option>
              <option value="Children">Children</option>
              <option value="Cosmetic">Cosmetic</option>
              <option value="OralSurgery">Oral Surgery</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Dental Insurance */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="hasDentalInsurance"
            >
              Dental Insurance
            </label>
            <input
              type="checkbox"
              id="hasDentalInsurance"
              name="hasDentalInsurance"
              checked={formData.hasDentalInsurance}
              onChange={handleChange}
            />
            <span className="ml-2">Yes</span>
          </div>

          {/* Conditional Insurance Fields */}
          {formData.hasDentalInsurance && (
            <div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="insuranceName"
                >
                  Insurance Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="insuranceName"
                  type="text"
                  placeholder="Insurance Name"
                  name="insuranceName"
                  value={formData.insuranceName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="insuranceNumber"
                >
                  Insurance Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="insuranceNumber"
                  type="text"
                  placeholder="Insurance Number"
                  name="insuranceNumber"
                  value={formData.insuranceNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Last X-Ray Date */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastXRayDate"
            >
              Last X-Ray Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastXRayDate"
              type="date"
              name="lastXRayDate"
              value={formData.lastXRayDate}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
