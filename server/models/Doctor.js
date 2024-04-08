const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const doctorSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  type: {
    required: true,
    type: [String],
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  non_availability: {
    type: [String],
  },
});

doctorSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
