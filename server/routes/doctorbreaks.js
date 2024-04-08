const express = require("express");
const Router = express.Router();
const DoctorBreak = require("../models/DoctorBreaks");

Router.post("/", async (req, res) => {
  const { doctor_id, date, startTime, endTime, reason, endDate } = req.body;
  try {
    const newDoctorBreak = new DoctorBreak({
      doctor_id,
      date,
      endDate,
      startTime,
      endTime,
      reason,
    });
    const savedDoctorBreak = await newDoctorBreak.save();
    res.status(200).json(savedDoctorBreak);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

Router.get("/", async (req, res) => {
  const { doctor_id } = req.query;

  try {
    const doctorBreaks = await DoctorBreak.find({
      doctor_id,
      status: "approved",
    });
    res.status(200).json(doctorBreaks);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

Router.get("/getslots", async (req, res) => {
  console.log(req.query);
  const { doctorId, date } = req.query;

  const dateObj = new Date(date);
  console.log(dateObj);

  try {
    const doctorBreaks = await DoctorBreak.find({
      doctor_id: doctorId,

      date: { $lte: dateObj },
      endDate: { $gte: dateObj },
    });

    return res.status(200).json(doctorBreaks);
  } catch {
    return res.status(500).json(error);
  }

  res.send("Hello");
});

// Get all pending doctor breaks

Router.get("/pending", async (req, res) => {
  try {
    const doctorBreaks = await DoctorBreak.find({ status: "pending" }).populate(
      "doctor_id"
    );
    res.status(200).json(doctorBreaks);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// get by id

Router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doctorBreak = await DoctorBreak.findById(id);
    res.status(200).json(doctorBreak);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

Router.get("/approve/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doctorBreak = await DoctorBreak.findByIdAndUpdate(id, {
      status: "approved",
    });
    res.status(200).json(doctorBreak);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

Router.get("/reject/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doctorBreak = await DoctorBreak.findByIdAndUpdate(id, {
      status: "rejected",
    });
    res.status(200).json(doctorBreak);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Delete a break

Router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doctorBreak = await DoctorBreak.findByIdAndDelete(id);
    res.status(200).json(doctorBreak);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = Router;
