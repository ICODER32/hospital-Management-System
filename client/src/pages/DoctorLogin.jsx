import React from "react";
import bgVideos from "../assets/bgvideo.mp4";
import { Link } from "react-router-dom";
import MySvg from "../assets/bg.png"; // Replace with your actual SVG file or component
import { motion } from "framer-motion";

const DoctorLogin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill all the fields");
      return;
    }
    if (email.includes("@") === false) {
      setError("Please enter a valid email");
      return;
    }
    setError("");

    // Password validation
    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    // if (!passwordRegex.test(password)) {
    //   setError(
    //     "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
    //   );
    //   return;
    // }

    try {
      const response = await fetch("/api/doctor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.assign("/dashboard");
      }
      if (!response.ok) {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    // Rest of the code
  };
  return (
    <div className="relative h-screen">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
        src={bgVideos}
      ></video>

      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg bg-opacity-30 backdrop-blur-sm flex-col gap-2 h-[90%] md:h-3/4rounded-lg md:flex-row p-10 flex justify-around items-center w-3/4 "
        >
          <div className=" flex flex-col w-[300px] items-center justify-center">
            <form onSubmit={handleSubmit}>
              <h1 className="text-4xl font-bold text-white mb-6 animate-bounce">
                Login as Doctor
              </h1>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 mb-4 text-xl rounded text-white bg-white bg-opacity-50"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 mb-6 text-xl rounded text-gray-700 bg-white bg-opacity-50"
              />
              <p className="text-red-500"> {error ? error : null}</p>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
              >
                Login
              </button>

              <p className="text-white">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-300 hover:text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>

          <div className="w-3/4 md:w-1/2">
            <img src={MySvg} alt="Background" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorLogin;
