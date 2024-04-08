const connectDb = require("./connection");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Breaks = require("../models/DoctorBreaks");
(async function () {
  await connectDb();
  await Admin.deleteMany({});
  await Doctor.deleteMany({});
  await Appointment.deleteMany({});
  await Breaks.deleteMany({});
  console.log("Database cleared");
  const adminSeed = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "admin@admin.com",
      password: await bcrypt.hash("Password@123", 10),
    },
  ];

  const doctorSeed = [
    {
      firstName: "James",
      lastName: "Col",
      type: ["OralSurgery"],
      email: "jame@example.com",
      phone: 1234567890,
      password: await bcrypt.hash("james@123", 10),
      non_availability: [],
    },
    {
      firstName: "Jenny",
      lastName: "Doe",
      type: ["Cosmetic"],
      email: "jenny@example.com",
      phone: 1234567890,
      password: await bcrypt.hash("jenny@123", 10),
      non_availability: [],
    },
    {
      firstName: "John",
      lastName: "Smith",
      type: ["Children"],
      email: "john@example.com",
      phone: 1234567890,
      password: await bcrypt.hash("john@123", 10),
      non_availability: [],
    },
    {
      firstName: "Emily",
      lastName: "Johnson",
      type: ["General"],
      email: "emily@example.com",
      phone: 1234567890,
      password: await bcrypt.hash("emily@123", 10),
      non_availability: [],
    },
    {
      firstName: "Michael",
      lastName: "Brown",
      type: ["OralSurgery", "Cosmetic"],
      email: "michael@example.com",
      phone: 1234567890,
      password: await bcrypt.hash("michael@123", 10),
      non_availability: [],
    },

    {
      firstName: "William",
      lastName: "Jones",
      type: ["General", "Children"],
      email: "william@example.com",
      phone: 1234567890,
      password: await bcrypt.hash("william@123", 10),
      non_availability: [],
    },
    {
      firstName: "Emma",
      lastName: "Garcia",
      type: ["OralSurgery", "Children"],
      email: "emma@example.com",
      phone: 1234567890,
      password: await bcrypt.hash("emma@123", 10),
      non_availability: [],
    },
    {
      firstName: "Olivia",
      lastName: "Martinez",
      type: ["Cosmetic", "General"],
      email: "olivia@example.com",
      phone: 1234567890,
      password: await bcrypt.hash("olivia@123", 10),
      non_availability: [],
    },
  ];

  await Admin.insertMany(adminSeed);
  await Doctor.insertMany(doctorSeed);
  console.log("Admins seeded");
  process.exit(1);
})();
