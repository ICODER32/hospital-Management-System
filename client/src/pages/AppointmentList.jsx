import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
  TableContainer,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  const navigation = useNavigate();

  const getAppointments = async () => {
    const response = await fetch("/api/appointment", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);

    setAppointments(data.appointments);
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const confirmAppointment = async (appointmentId) => {
    console.log(appointmentId);
    navigation(`/confirmappointment/${appointmentId}`);
  };

  return (
    <>
      <Navbar role="admin" />
      <div className="w-full flex mt-10 items-center justify-center">
        <div className="w-11/12 flex flex-col gap-10">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="flex flex-col gap-10 items-center justify-start bg-gray-100 shadow-sm rounded-md p-2"
            >
              <h2 className=" text-lg font-bold">Appointment Details</h2>
              <div className=" ">
                <TableContainer></TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="font-bold">
                        <span className="font-bold">First Name</span>
                      </TableCell>
                      <TableCell className="font-bold">
                        <span className="font-bold">Last Name</span>
                      </TableCell>
                      <TableCell className="font-bold">
                        <span className="font-bold">Age</span>
                      </TableCell>
                      <TableCell className="font-bold">
                        <span className="font-bold">Address</span>
                      </TableCell>
                      <TableCell className="font-bold">
                        <span className="font-bold">Phone Number</span>
                      </TableCell>
                      <TableCell className="font-bold">
                        <span className="font-bold">Doctor Type</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {appointment?.patient_id ? (
                        <>
                          <TableCell>
                            {appointment?.patient_id?.firstName}
                          </TableCell>
                          <TableCell>
                            {appointment.patient_id.lastName}
                          </TableCell>
                          <TableCell>{appointment.patient_id.age}</TableCell>
                          <TableCell>
                            {appointment.patient_id.address}
                          </TableCell>
                          <TableCell>
                            {appointment.patient_id.phoneNumber}
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{appointment?.firstName}</TableCell>
                          <TableCell>{appointment.lastName}</TableCell>
                          <TableCell>{appointment.age}</TableCell>
                          <TableCell>{appointment.address}</TableCell>
                          <TableCell>{appointment.phoneNumber}</TableCell>
                        </>
                      )}

                      <TableCell>{appointment.doctorType}</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableHead>
                    <TableRow>
                      <TableCell className="font-bold">
                        <span className="font-bold">Requested Date</span>
                      </TableCell>
                      <TableCell className="font-bold">
                        <span className="font-bold">Requested Time</span>
                      </TableCell>
                      <TableCell className="font-bold">
                        <span className="font-bold">Status</span>
                      </TableCell>
                      <TableCell className="font-bold">
                        <span className="font-bold">X-Ray Date</span>
                      </TableCell>
                      <TableCell className="font-bold">
                        <span className="font-bold">Insurance</span>
                      </TableCell>
                      <TableCell className="font-bold">
                        <span className="font-bold">Action</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{appointment.appointmentDate}</TableCell>
                      <TableCell>{appointment.appointmentTime}</TableCell>
                      <TableCell>
                        <span
                          className={
                            appointment.status === "pending" &&
                            "bg-yellow-500 p-2 rounded-md"
                          }
                        >
                          {appointment.status}
                        </span>
                      </TableCell>
                      <TableCell>{appointment.lastXRayDate}</TableCell>
                      <TableCell>
                        {appointment.hasDentalInsurance
                          ? `Name : ${appointment.insuranceName}, Number: ${appointment.insuranceNumber}`
                          : "nil"}
                      </TableCell>
                      <TableCell>
                        {appointment.doctor_id ? (
                          <Button
                            onClick={() => console.log("confirmed")}
                            variant="contained"
                            color="info"
                          >
                            Confirm
                          </Button>
                        ) : (
                          <Button
                            onClick={() => confirmAppointment(appointment._id)}
                            variant="contained"
                            color="info"
                          >
                            Confirm
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <span className=" text-gray-500 text-sm w-full text-start ml-4">
                Created {moment(appointment.createdAt).fromNow()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
