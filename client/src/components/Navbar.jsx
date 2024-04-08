import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import verifyauth from "../utils/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";

function Navbar({ role }) {
  const user = useSelector((state) => state.user.user);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleDelete = () => {
    localStorage.removeItem("token");
    window.location.assign("/");
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const user = await verifyauth();

      dispatch(login(user));
    };
    fetchData();
    // cleanup
  }, [dispatch]);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to={"/"}>Dental Care</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* Pages */}
              <div>
                {role === "patient" && (
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to={"/"}>Home</Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to="/bookappointment">Book an Appointment</Link>
                    </MenuItem>
                  </>
                )}

                {role === "doctor" && (
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to={"/dashboard"}>Home</Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to={"/breaks"}>Breaks</Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography>Patients</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to={"/appointments"}>Appointments</Link>
                    </MenuItem>
                  </>
                )}

                {role === "admin" && (
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to={"/dashboard"}>Home</Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to={"/requests"}>Requests</Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography>Patients</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link to={"/appointments"}>Appointments</Link>
                    </MenuItem>
                  </>
                )}
              </div>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to={"/"}>Dental Care</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {role === "patient" && (
              <>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to={"/"}>Home</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/bookappointment">Book an Appointment</Link>
                </MenuItem>
              </>
            )}
            {role === "doctor" && (
              <>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to={"/dashboard"}>Home</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to={"/breaks"}>Breaks</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography>Patients</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography>Appointments</Typography>
                </MenuItem>
              </>
            )}
            {role === "admin" && (
              <>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to={"/dashboard"}>Home</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to={"/requests"}>Requests</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography>Patients</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to={"/appointments"}>Appointments</Link>
                </MenuItem>
              </>
            )}
          </Box>
          {role === "patient" ? (
            <></>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.username} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Typography>
                    Logged in as :<b>{user?.username}</b>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
