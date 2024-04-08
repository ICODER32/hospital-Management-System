const mongoose = require("mongoose");

// firstName: "",
//     lastName: "",
//     age: "",
//     address: "",
//     phoneNumber: "",
//     appointmentDate: "",
//     doctorType: "",
//     hasDentalInsurance: false,
//     insuranceName: "",
//     insuranceNumber: "",
//     lastXRayDate: "",
//     appointmentTime: "",
const AppointmentSchema = mongoose.Schema(
  {
    appointmentDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    doctorType: {
      type: String,
      required: true,
    },

    doctor_id: {
      type: String,
      default: "",
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    patient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
