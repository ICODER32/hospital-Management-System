import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { X } from "lucide-react";

import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";

import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function DoctorForm() {
  const [open, setOpen] = React.useState(false);
  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [PhoneNumber, setPhoneNumber] = React.useState("");
  const [error, setError] = React.useState("");
  const [DoctorType, setDoctorType] = React.useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    const data = {
      firstName: FirstName,
      lastName: LastName,
      email: Email,
      password: Password,
      phone: PhoneNumber,
      type: DoctorType,
    };
    try {
      const response = await fetch("/api/doctor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setOpen(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setDoctorType("");
        setError("");
      } else {
        setError("Something went wrong");
      }
    } catch (error) {}
  };

  return (
    <>
      <Button color="success" variant="contained" onClick={handleOpen}>
        Add Doctor
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <X
            className="cursor-pointer hover:bg-gray-400 hover:text-black rounded-md transition-all absolute top-2 right-1 m-2"
            onClick={() => setOpen(false)}
          />
          <div className=" flex flex-col mt-4 gap-10">
            <div className="flex gap-10">
              <TextField
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="first-name"
                placeholder="Enter FirstName"
                label=" FirstName"
                variant="outlined"
              />
              <TextField
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                id="last-name"
                placeholder="Enter FirstName"
                label=" Last Name"
                variant="outlined"
              />
            </div>
            <TextField
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter Email"
              label=" Email"
              variant="outlined"
            />
            <TextField
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter Password"
              label=" Password"
              type="password"
              variant="outlined"
            />
            <TextField
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              id="ph-number"
              placeholder="Enter Phone Number"
              label=" Number"
              type="number"
              variant="outlined"
            />
            <Select
              multiple
              value={DoctorType}
              onChange={(e) => setDoctorType(e.target.value)}
              labelId="doctor-type-label"
              id="doctor-type"
              placeholder="Select Doctor Type"
              label="Type"
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="Children">Children</MenuItem>
              <MenuItem value="Cosmetic">Cosmetic</MenuItem>
              <MenuItem value="OralSurgery">Oral Surgery</MenuItem>
            </Select>
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}
            <Button onClick={handleSubmit}>Create</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
