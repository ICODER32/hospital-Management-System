const express = require("express");
const connectDb = require("./config/connection");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

dotenv.config();
connectDb();

const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true }, // Set secure to true if using https
  })
);

app.use("/api/admin", require("./routes/admin"));
app.use("/api/doctor", require("./routes/doctor"));
app.use("/api/appointment", require("./routes/appointment"));
app.use("/api/doctorbreaks", require("./routes/doctorbreaks"));
app.use("/api/calls", require("./routes/twiolio"));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
