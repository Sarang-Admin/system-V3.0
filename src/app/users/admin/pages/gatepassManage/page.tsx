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
import { useParams } from "next/navigation";



export default function ManageGatepass() {
  const router = useRouter();
  const [student, setStudent] = React.useState({
    studentID: "",
    username: "",
    standard: "",
    hostel: "",
    hostelRoom: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    fatherName: "",
  });
  const [gatepass, setGatepass] = React.useState({
    gatepassID: "",    
    studentID: "",     
    careTaker: "",     
    leavingDate: null,   
    time : "",         
    reason: "",        
    returnDate: null,    
  })

  const handleDateChange = (newDate: any) => {
    setGatepass({ ...gatepass, leavingDate: newDate });
  };

  const handleDateChange2 = (newDate: any) => {
    setGatepass({ ...gatepass, returnDate: newDate });
  };

  
  const onbtnClick = async () => {
    try {
      await axios.post("/api/users/admin/gatepass", gatepass);
      router.refresh();
      toast.success("Gatepass added successfully");
      setGatepass({
        gatepassID: "",    
        studentID: "",         
        careTaker: "",     
        leavingDate: null,   
        time : "",         
        reason: "",        
        returnDate: null,
      })
      
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
            Add Gatepass
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Gatepass Management
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="gatepassID"
                name="gatepassID"
                label="Gatepass ID"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setGatepass({ ...gatepass, gatepassID: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="studentID"
                name="studentID"
                label="Student ID"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setGatepass({ ...gatepass, studentID: e.target.value })
                }
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="caretaker"
                name="caretaker"
                label="Caretaker"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setGatepass({ ...gatepass, careTaker: e.target.value })
                }
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Leaving Date" onChange={handleDateChange} />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Return Date"
                  onChange={handleDateChange2}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="reason"
                name="reason"
                label="Reason"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setGatepass({ ...gatepass, reason: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="time"
                name="time"
                label="Time"
                fullWidth
                variant="standard"
                onChange={(e) =>
                  setGatepass({ ...gatepass, time: e.target.value })
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
                Add Gatepass
              </Button>
            </Box>
          </Grid>
        </Paper>
        <Toaster position="bottom-right" reverseOrder={false} />
      </Container>
    </React.Fragment>
  );
}
