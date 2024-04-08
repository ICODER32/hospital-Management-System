const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  insuranceName: {
    type: String,
    required: false,
  },
  insuranceNumber: {
    type: String,
    required: false,
  },
  lastXRayDate: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
