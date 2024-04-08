const express = require("express");
const Admin = require("../models/Admin");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { createToken, verifyToken } = require("./token");

router.post("/register", async (req, res) => {
  try {
    const admin = await Admin(req.body);
    const createdadmin = await admin.save();
    const token = await createToken({ id: createdadmin._id });
    console.log(token);
    // set cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    });
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid credentials" });
    const token = await createToken({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: "admin",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "success", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
