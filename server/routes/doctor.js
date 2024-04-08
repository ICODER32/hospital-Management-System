const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");
const Appointment = require("../models/Appointment");
const Breaks = require("../models/DoctorBreaks");
const { createToken, verifyToken } = require("./token");

router.post("/register", async (req, res) => {
  const doctor = new Doctor(req.body);
  try {
    await doctor.save();
    res.status(201).send({ doctor });
  } catch (e) {
    res.status(400).send(e);
  }
});

// get all doctors remove paassword field
router.get("/", async (req, res) => {
  const type = req.query.type;

  try {
    if (type) {
      const doctors = await Doctor.find(
        { type: { $in: type } },
        { password: 0 }
      );
      return res.send(doctors);
    }
    const doctors = await Doctor.find({}, { password: 0 });
    res.send(doctors);
  } catch (e) {
    res.status(500).send();
  }
});

// doctor login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Doctor.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid credentials" });
    const token = await createToken({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: "doctor",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "success", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/suggest", async (req, res) => {
  const { type, time, date } = req.query;
  // craete string like 09:00 AM
  let timeparsed =
    parseInt(time) > 12
      ? `${parseInt(time) - 12}:00 PM`
      : `${parseInt(time)}:00 AM`;

  try {
    const doctors = await Doctor.find({ type: { $in: type } });

    const appointments = await Appointment.find({
      // only get appoimentts withstatus approved
      status: "approved",
      appointmentDate: date,
      appointmentTime: time,
    });

    const breaks = await Breaks.find({
      date: date,
      startTime: timeparsed,
    });
    // remove the first zero  09:00 AM
    const breakdoctors = breaks.map((b) => b.doctor_id.toString());
    const appoinmentdoctors = appointments.map((a) => a.doctor_id.toString());

    const availableDoctors = doctors.map((d) => {
      if (
        !appoinmentdoctors.includes(d._id.toString()) &&
        !breakdoctors.includes(d._id.toString())
      ) {
        return d;
      }
    });

    res.send(availableDoctors);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/");

module.exports = router;
