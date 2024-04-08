import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import DoctorForm from "../components/DoctorForm";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DoctorTable from "../components/DoctorsTable";
import verifyauth from "../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/userSlice";
import Schedule from "../components/Schedule";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  border: "1px solid #00007",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.user);
  const [doctors, setDoctors] = React.useState([]);
  const getDoctors = async () => {
    const response = await fetch("/api/doctor", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setDoctors(data);
  };

  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await verifyauth();

      getDoctors();
      dispatch(login(user));
      setUser(user);
    };
    fetchData();
    // cleanup
  }, [dispatch]);
  return (
    <>
      {role?.role === "doctor" ? (
        <>
          <Navbar role={role?.role} />
          {/* <GoogleCalendarEventCreator /> */}
          <Schedule />
        </>
      ) : (
        <>
          <Navbar role={role?.role} />
          <div
            role={role?.role}
            className=" flex items-center justify-center flex-col"
          >
            {/* <Navbar /> */}
            <div className="flex flex-col p-10 gap-9 bg-slate-100 shadow-md rounded-md  w-11/12 mt-2  items-center justify-around">
              <div className=" flex-col md:flex-row gap-10    w-full flex items-center justify-around">
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>

                <DoctorForm />
              </div>
              <div>
                <DoctorTable doctors={doctors} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
