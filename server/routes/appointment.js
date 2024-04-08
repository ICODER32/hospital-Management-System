const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const DoctorBreak = require("../models/DoctorBreaks");
const Patient = require("../models/Patients");

// create an appoinment

router.post("/create", async (req, res) => {
  const {
    firstName,
    lastName,
    age,
    address,
    phoneNumber,
    appointmentDate,
    doctorType,
    hasDentalInsurance,
    insuranceName,
    insuranceNumber,
    lastXRayDate,
    appointmentTime,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !age ||
    !address ||
    !phoneNumber ||
    !appointmentDate ||
    !doctorType ||
    !appointmentTime
  ) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    const patient = new Patient({
      firstName,
      lastName,
      age,
      address,
      phoneNumber,
      insuranceName,
      insuranceNumber,
      lastXRayDate,
    });
    const newPatient = await patient.save();
    const appoinment = new Appointment({
      appointmentDate,
      doctorType,
      hasDentalInsurance,
      patient_id: newPatient._id,
      appointmentTime,
    });

    await appoinment.save();
    return res.status(201).json({ appoinment });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// get all appointments

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: "pending" })
      .populate("patient_id")
      .populate("doctor_id");
    return res.status(200).json({ appointments });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// get appointment by id

router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "patient_id"
    );
    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// update appointment by id

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { doctor_id } = req.body;
  try {
    const appointment = await Appointment.findByIdAndUpdate(id, {
      doctor_id,
      status: "approved",
    });

    let timeparsed =
      parseInt(appointment.appointmentTime) > 12
        ? `${parseInt(appointment.appointmentTime) - 12}:00 PM`
        : `${parseInt(appointment.appointmentTime)}:00 AM`;
    const breakd = new DoctorBreak({
      doctor_id: doctor_id,
      date: appointment.appointmentDate,
      endDate: appointment.appointmentDate,
      startTime: timeparsed,
      endTime: timeparsed.split(":")[0] + ":50 AM",
      reason: "appointment",
      status: "approved",
      appointmentId: appointment._id,
    });
    await breakd.save();

    return res.status(200).json({ appointment, message: "Appointment added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});
module.exports = router;
