import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import AdminLogin from "../pages/AdminLogin";
import { Navigate } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import verifyauth from "./auth";
import DoctorLogin from "../pages/DoctorLogin";
import BookAppointment from "../pages/BookAppointment";
import AppointmentList from "../pages/AppointmentList";
import DoctorBreak from "../pages/DoctorBreak";
import Requests from "../pages/Requests";
import AssignAppointment from "../pages/AssignAppointment";
const auth = await verifyauth();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/adminlogin",
    element: auth ? <Navigate to="/dashboard" replace /> : <AdminLogin />,
  },
  {
    path: "/doctorlogin",
    element: auth ? <Navigate to="/dashboard" replace /> : <DoctorLogin />,
  },
  {
    path: "/dashboard",
    element: !auth ? <Navigate to="/adminlogin" replace /> : <AdminDashboard />,
  },
  {
    path: "/bookappointment",
    element: <BookAppointment />,
  },
  {
    path: "/appointments",
    element: !auth ? (
      <Navigate to="/adminlogin" replace />
    ) : (
      <AppointmentList />
    ),
  },
  {
    path: "/breaks",
    element: !auth ? <Navigate to="/doctorlogin" replace /> : <DoctorBreak />,
  },
  {
    path: "/requests",
    element: !auth ? <Navigate to="/adminlogin" replace /> : <Requests />,
  },

  {
    path: "/confirmappointment/:id",
    element: !auth ? (
      <Navigate to="/adminlogin" replace />
    ) : (
      <AssignAppointment />
    ),
  },
]);

export default router;
