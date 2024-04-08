const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://m001-student:Ibtisam@sandbox.xuwkkn8.mongodb.net/DentalCare?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
