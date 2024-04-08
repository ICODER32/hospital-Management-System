const Patient = require("../models/Patients");
const createPaitent = async (phoneNumber) => {
  try {
    const patient = new Patient({
      phoneNumber: phoneNumber,
    });
    await patient.save();

    return patient;
  } catch (error) {
    console.log(error);
  }
};

const updatePatient = async (
  phoneNumber,
  fullName,
  email,
  address,
  age,
  insurance,
  insuranceNumber,
  lastXRayDate
) => {
  try {
    const patient = await Patient.findOne({ phoneNumber: phoneNumber });
    patient.firstName = fullName.split(" ")[0];
    patient.lastName = fullName.split(" ")[1];
    patient.email = email;
    patient.address = address;
    patient.age = age;
    patient.insuranceName = insurance;
    patient.insuranceNumber = insuranceNumber;
    patient.lastXRayDate = lastXRayDate;
    await patient.save();
    return patient;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createPaitent, updatePatient };
