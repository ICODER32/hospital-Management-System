import React, { useEffect } from "react";
import bgVideos from "../assets/bgvideo.mp4";
import { Link, useNavigate } from "react-router-dom";
import MySvg from "../assets/bg.png"; // Replace with your actual SVG file or component
import verifyauth from "../utils/auth";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import { login } from "../store/slices/userSlice";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      verifyauth();
      if (verifyauth.username) {
        dispatch(login(verifyauth));
        navigate("/dashboard");
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          className="bg-white rounded-lg bg-opacity-30 backdrop-blur-sm flex-col gap-10 h-[90%] md:h-3/4rounded-lg md:flex-row p-10 flex justify-between items-center w-3/4 "
        >
          <Link
            className=" absolute top-2 right-2 text-white hover:text-blue-500 hover:underline"
            to="/doctorlogin"
          >
            Doctor Login
          </Link>
          <Link
            className=" absolute top-2 right-32 text-white hover:text-blue-500 hover:underline"
            to="/adminlogin"
          >
            Admin Login
          </Link>
          <div className="w-3/4 md:w-1/2 flex flex-col items-center justify-center">
            <h1 className="text-4xl text-white text-center font-bold mb-4">
              Dental Care Solutions
            </h1>
            <p className="text-xl mb-6 w-full text-center text-slate-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
              officia?
            </p>
            <Link to={"/bookappointment"}>
              <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700">
                Book Appointment
              </button>
            </Link>
          </div>

          <div className="w-3/4">
            {/* Replace this with your actual SVG component */}
            <img src={MySvg} alt="logo" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
