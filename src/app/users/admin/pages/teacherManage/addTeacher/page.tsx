"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DataItem {
  staffID: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  contact: string;
  dob: string;
  joiningDate: string;
  bloodGroup: string;
  userType: string;
}

export default function ManageTeacher() {
  const router = useRouter();
  const [teacher, setTeacher] = React.useState({
    staffID: "",
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    contact: "",
    dob: null,
    joiningDate: null,
    bloodGroup: "",
    userType: "",
  });

  const handleDateChange = (newDate: any) => {
    setTeacher({ ...teacher, dob: newDate });
  };

  const handleDateChange2 = (newDate: any) => {
    setTeacher({ ...teacher, joiningDate: newDate });
  };

  const onbtnClick = async () => {
    try {
      await axios.post("/api/users/admin/teacher", teacher);
      router.refresh();
      toast.success("Teacher added successfully");
      setTeacher({
      staffID: "",
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      contact: "",
      dob: null,
      joiningDate: null,
      bloodGroup: "",
      userType: "",})
      
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Teacher Signup
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Teacher Information
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                onChange={(e) =>
                  setTeacher({ ...teacher, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="family-name"
                variant="standard"
                onChange={(e) =>
                  setTeacher({ ...teacher, lastName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="username"
                name="username"
                label="Username"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setTeacher({ ...teacher, username: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="staffID"
                name="staffID"
                label="Staff ID"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setTeacher({ ...teacher, staffID: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
                variant="standard"
                onChange={(e) =>
                  setTeacher({ ...teacher, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                fullWidth
                autoComplete="password"
                variant="standard"
                type="password"
                onChange={(e) =>
                  setTeacher({ ...teacher, password: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address"
                required
                name="address"
                label="Address"
                multiline
                fullWidth
                variant="standard"
                rows={3}
                onChange={(e) =>
                  setTeacher({ ...teacher, address: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="contact"
                name="contact"
                label="Contact Number"
                fullWidth
                autoComplete="contact"
                variant="standard"
                onChange={(e) =>
                  setTeacher({ ...teacher, contact: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Date of Birth" onChange={handleDateChange} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Joining"
                  onChange={handleDateChange2}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="bloodGroup"
                name="bloodgroup"
                label="Blood Group"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setTeacher({ ...teacher, bloodGroup: e.target.value })
                }
              />
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                variant="outlined"
                onClick={onbtnClick}
                sx={{ mt: 3, ml: 1 }}
              >
                Add Teacher
              </Button>
            </Box>
          </Grid>
        </Paper>
        <Toaster position="bottom-right" reverseOrder={false} />
      </Container>
    </React.Fragment>
  );
}
