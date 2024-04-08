const express = require("express");
const twilio = require("twilio");
const router = express.Router();
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const Patient = require("../models/Patients");
const Appointment = require("../models/Appointment");
const { createPaitent, updatePatient } = require("./utils");

const accountSid = "AC109b27b5fef0b2bfee7687b032ebd865";
const authToken = "b9537d260897ae72ceacb01e5cde0e9d";
const twilioClient = twilio(accountSid, authToken);

const baseUrl = "https://pleasing-randomly-tarpon.ngrok-free.app/api/calls";

let doctorType;
let appointmentDate;
let appointmentTime;
let phoneNumber;
let selectedDoctor;
let doctorsSuggestions;
let patient;

let isOnCall = false;
const getDoctorList = async (doctorType) => {
  console.log("Getting list of doctors", doctorType);
  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

  const selections = []; // Array to hold the selections

  for (let i = 0; i < 3; i++) {
    // Loop for today, tomorrow, and day after tomorrow
    try {
      const time = times[Math.floor(Math.random() * times.length)];
      const date = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000); // Calculate date for each iteration

      const response = await fetch(
        `https://pleasing-randomly-tarpon.ngrok-free.app/api/doctor/suggest?type=${doctorType}&time=${time}&date=${date}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const randomDoctorSelection =
          data[Math.floor(Math.random() * data.length)];
        selections.push({
          date: date.toLocaleDateString(),
          time:
            time.split(":")[0] > 12
              ? `${time.split(":")[0] - 12}:${time.split(":")[1]} PM`
              : `${time.split(":")[0]}:${time.split(":")[1]} AM`,
          doctor: randomDoctorSelection,
        });
      }
    } catch (error) {
      console.log(error);
      // In case of error, push a null or some error indication to maintain the array length
      selections.push(null);
    }
  }

  console.log("Selections:", selections);
  return selections;
};

router.post("/initiate-call", async (req, res) => {
  const receiverNumber = req.body.receiverNumber;
  try {
    const call = await twilioClient.calls.create({
      url: `${baseUrl}/call-handler`,
      to: receiverNumber,
      from: "+18886642948",
    });

    console.log("Call initiated:", call.sid);
    res.status(200).send("Call initiated successfully.");
  } catch (error) {
    console.error("Error initiating call:", error);
    res.status(500).json({ message: "Error initiating call." });
  }
});

router.post("/call-handler", async (req, res) => {
  phoneNumber = req.body.To;

  const twiml = new twilio.twiml.VoiceResponse();

  if (isOnCall) {
    twiml.say("Welcome to our dental clinic.");
    twiml.say(
      "Line Busy at the moment. Please wait for a moment. Please call again later."
    );
    twiml.hangup();
    return res.type("text/xml").send(twiml.toString());
  }

  isOnCall = true;

  try {
    const alreadyExist = await Patient.findOne({
      phoneNumber,
    });

    patient = alreadyExist;

    twiml.say("Welcome to our dental clinic.");
    // console.log(alreadyExist.firstName);
    if (alreadyExist && alreadyExist.firstName) {
      twiml.say(
        `Welcome back, ${alreadyExist.firstName}. Glad to see you again. Press 1 to book an appointement. Press 2 to talk to our customer service representative.`
      );
    } else {
      const newPatient = await createPaitent(phoneNumber);
      patient = newPatient;
      twiml.say(
        `
          Glad to see you here. Please, Press 1 to book an appointment. Press 2 to talk to our customer service representative.
          `
      );
    }

    twiml.gather({
      numDigits: 1,
      action: "/api/calls/doctorTypeSelection",
    });

    res.type("text/xml");
    return res.send(twiml.toString());
  } catch (error) {
    console.log(error);
  }

  // Render the response as XML in reply to the webhook request
  res.type("text/xml");
  res.send(twiml.toString());
});

// Doctor type selection
router.post("/doctorTypeSelection", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  const selection = req.body.Digits;

  if (selection == "1") {
    twiml.say(
      "Please enter the number corresponding to your doctor type. 1 for General, 2 for Cosmetic, 3 for Oral, 4 for Children, and 5 to repeat the options."
    );
    twiml.gather({
      numDigits: 1,
      action: "/api/calls/appointment",
    });
  }
  if (selection === "2") {
    twiml.say(
      "Please wait while we connect you to our customer service representative."
    );
    twiml.dial("+18886642948");
  }
  res.type("text/xml");
  res.send(twiml.toString());
});

// Appointment date and time for both new and old patients
router.post("/appointment", async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  const selectedDoctorType = req.body.Digits;

  if (selectedDoctorType === "1") {
    doctorType = "General";
    twiml.say(
      "You have selected General. Please wait for the available appointments."
    );
    twiml.redirect("/api/calls/confirmation");
  }
  if (selectedDoctorType === "2") {
    doctorType = "Cosmetic";
    twiml.say(
      "You have selected Cosmetic. Please wait for the available appointments."
    );

    twiml.redirect("/api/calls/confirmation");
  }
  if (selectedDoctorType === "3") {
    doctorType = "OralSurgery";
    twiml.say(
      "You have selected Oral. Please wait for the available appointments."
    );

    twiml.redirect("/api/calls/confirmation");
  }
  if (selectedDoctorType === "4") {
    doctorType = "Children";
    twiml.say(
      "You have selected Children. Please wait for the available appointments."
    );

    twiml.redirect("/api/calls/confirmation");
  }
  if (selectedDoctorType === "5") {
    twiml.redirect("/api/calls/doctorTypeSelection");
  }

  res.type("text/xml");
  res.send(twiml.toString());
});

// Confirmation for both new and old patients

router.post("/confirmation", async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  const data = await getDoctorList(doctorType);

  doctorsSuggestions = data;
  console.log("Suggestions", doctorsSuggestions);

  for (let i = 0; i < data.length; i++) {
    if (data[i]) {
      twiml.say(
        `Press ${i + 1} to confirm your appointment with Dr. ${
          data[i].doctor.firstName
        } ${data[i].doctor.lastName},
        the appointment is scheduled on ${data[i].date}, at ${data[i].time}.`
      );
    }
  }

  twiml.say("Press 9 to repeat the options.");

  // twiml.say(
  //   `Your appointment is scheduled with Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName}.
  //   The appointment is scheduled on ${appointmentDate}, at ${appointmentTime}.`
  // );

  twiml.gather({
    numDigits: 1,
    action: "/api/calls/confirmationHandler",
  });

  res.type("text/xml");
  res.send(twiml.toString());
});

// Confirmation handler for both new and old patients

router.post("/confirmationHandler", (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  const selectedOption = req.body.Digits;

  if (selectedOption === "1") {
    selectedDoctor = doctorsSuggestions[0].doctor;
    appointmentDate = doctorsSuggestions[0].date;
    appointmentTime = doctorsSuggestions[0].time;
    twiml.say(
      `
      You booked appointment with Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName}.
      The appointment is scheduled on ${appointmentDate}, at ${appointmentTime}.
      To confirm appoinment reply to the text message that will be sent to you for some details.
      `
    );
    twiml.redirect("/api/calls/goodbye");
  } else if (selectedOption === "2") {
    selectedDoctor = doctorsSuggestions[1].doctor;
    appointmentDate = doctorsSuggestions[1].date;
    appointmentTime = doctorsSuggestions[1].time;

    twiml.say(
      `
      You booked appointment with Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName}.
      The appointment is scheduled on ${appointmentDate}, at ${appointmentTime}.
      To confirm appoinment reply to the text message that will be sent to you for some details.
      `
    );

    twiml.redirect("/api/calls/goodbye");
  } else if (selectedOption === "3") {
    selectedDoctor = doctorsSuggestions[2].doctor;
    appointmentDate = doctorsSuggestions[2].date;
    appointmentTime = doctorsSuggestions[2].time;
    twiml.say(
      `
      You booked appointment with Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName}.
      The appointment is scheduled on ${appointmentDate}, at ${appointmentTime}.
      To confirm appoinment reply to the text message that will be sent to you for some details.
      `
    );

    console.log("Selected Doctor:", selectedDoctor);
    twiml.redirect("/api/calls/goodbye");
  }

  if (selectedOption === "9") {
    twiml.redirect("/api/calls/confirmation");
  }
  res.type("text/xml");
  res.send(twiml.toString());
});

const createAppointment = async () => {
  console.log("Creating appointment");
  try {
    const appointment = new Appointment({
      doctorType: doctorType,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
      phoneNumber: phoneNumber,
      patient_id: patient._id,
      doctor_id: selectedDoctor._id,
      status: "pending",
    });

    await appointment.save();
    console.log("Appointment created:", appointment);
  } catch (error) {
    console.log("Error creating appointment:", error);
  }
};

const sendTextMessage = async () => {
  try {
    // send whatsapp message
    const message = await twilioClient.messages.create({
      from: "whatsapp:+14155238886",
      body: `Please reply with your full name and email address to confirm your appointment with Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName} on ${appointmentDate} at ${appointmentTime}. \nYour credentials sending format is:\nFull name : _________ \nEmail : ________\n Residential Address: __________ \nAge: ____________ \nInsurance: __________ \nInsurance Number: _____________ \nLast X-ray Date: _________`,
      to: `whatsapp:${phoneNumber}`,
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
// Goodbye message
router.post("/goodbye", async (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  twiml.say("Thank you for booking an appointment with us. Goodbye.");
  twiml.hangup();
  createAppointment();
  if (patient?.firstName) {
    sendConfirmationMessage();
  } else {
    sendTextMessage();
  }
  isOnCall = false;
  res.type("text/xml");
  res.send(twiml.toString());
});

const sendConfirmationMessage = async () => {
  try {
    // send whatsapp message
    const message = await twilioClient.messages.create({
      from: "whatsapp:+14155238886",
      body: `Thanks you for choosing us ${patient?.firstName}. Your appointment with Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName} is confirmed on ${appointmentDate} at ${appointmentTime}.`,
      to: `whatsapp:${phoneNumber}`,
    });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

router.post("/receiveMessage", async (req, res) => {
  console.log("Message received:", req.body);
  // Your credentials sending format is:\nFull name : _________ \nEmail : ________\n Residential Address: __________ \nAge: ____________ \nInsurance: __________ \nInsurance Number: _____________ \nLast X-ray Date: _________extract all information from the message
  const message = req.body.Body;
  const messageArray = message.split("\n");
  const fullName = messageArray[0].split(":")[1].trim();
  const email = messageArray[1].split(":")[1].trim();
  const address = messageArray[2].split(":")[1].trim();
  const age = messageArray[3].split(":")[1].trim();
  const insurance = messageArray[4].split(":")[1].trim();
  const insuranceNumber = messageArray[5].split(":")[1].trim();
  const lastXRayDate = messageArray[6].split(":")[1].trim();

  console.log("Extracted data:", {
    fullName,
    email,
    address,
    age,
    insurance,
    insuranceNumber,
    lastXRayDate,
  });

  // Update the patient information
  const updatedPatient = await updatePatient(
    phoneNumber,
    fullName,
    email,
    address,
    age,
    insurance,
    insuranceNumber,
    lastXRayDate
  );

  console.log("Patient updated:", updatedPatient);

  sendConfirmationMessage();
  res.status(200).send("Message received successfully.");
});

module.exports = router;
