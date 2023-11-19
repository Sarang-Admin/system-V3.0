"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

interface HostelItem {
  id: string;
  hostelName: string;
  rooms: number;
}

interface ClassRoomItem {
  id: string;
  className: string;
}

export default function AddStudent() {
  const router = useRouter();
  const [menuHostel, setMenuHostel] = React.useState<HostelItem[]>([]);
  const [menuClassRoom, setMenuClassRoom] = React.useState<ClassRoomItem[]>([]);
  const [dataUpdated, setDataUpdated] = React.useState(false);
  const [student, setStudent] = React.useState({
    studentID: "",
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    address: "",
    contact: "",
    altContact: "",
    whContact: "",
    parentContact: "",
    city: "",
    pincode: 0,
    dob: null,
    admissionDate: null,
    bloodGroup: "",
    lastSchool: "",
    isSatsangi: "",
    nearTemple: "",
    alergy: "",
    dieces: "",
    isDish: "",
    isBed: "",
    hostel: "",
    room: "",
    standard: "",
  });

  const handleDateChange = (newDate: any) => {
    setStudent({ ...student, dob: newDate });
  };

  const handleDateChange2 = (newDate: any) => {
    setStudent({ ...student, admissionDate: newDate });
  };

  const findStudent = async () => {
    router.push("/users/admin/pages/studentManage/findStudent");
  };

  React.useEffect(() => {
    fetchHostel();
    fetchStandard();
  }, [dataUpdated]);

  async function fetchHostel() {
    try {
      const response = await fetch("/api/users/admin/hostel");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { hostels } = await response.json();
      if (hostels) {
        setMenuHostel(hostels);
      } else {
        console.error("Hostels data not found in the response:", response);
      }
      setDataUpdated(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchStandard() {
    try {
      const response = await fetch("/api/users/admin/classRoom");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { classes } = await response.json();
      if (classes) {
        setMenuClassRoom(classes);
      } else {
        console.error("Classroom data not found in the response:", response);
      }
      setDataUpdated(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  const onbtnClick = async () => {
    try {
      await axios.post("/api/users/admin/student", student);
      router.refresh();
      toast.success("Student added successfully");
      setStudent({
        studentID: "",
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        fatherName: "",
        motherName: "",
        address: "",
        contact: "",
        altContact: "",
        whContact: "",
        parentContact: "",
        city: "",
        pincode: 0,
        dob: null,
        admissionDate: null,
        bloodGroup: "",
        lastSchool: "",
        isSatsangi: "",
        nearTemple: "",
        alergy: "",
        dieces: "",
        isDish: "",
        isBed: "",
        hostel: "",
        room: "",
        standard: "",
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
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
              Student Signup
            </Typography>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              વિદ્યાર્થીની માહિતી
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="વિદ્યાર્થીનું નામ"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, firstName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="અટક"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, lastName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="fatherName"
                  name="fatherName"
                  label="પિતાનું નામ"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, fatherName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="motherName"
                  name="motherName"
                  label="માતાનું નામ"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, motherName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="username"
                  name="username"
                  label="યુઝરનેમ"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, username: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="studentID"
                  name="studentID"
                  label="શાળાનું આઈડી"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, studentID: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="ઇમેઇલ"
                  fullWidth
                  autoComplete="email"
                  variant="standard"
                  type="email"
                  onChange={(e) =>
                    setStudent({ ...student, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="password"
                  name="password"
                  label="પાસવર્ડ"
                  fullWidth
                  autoComplete="password"
                  variant="standard"
                  type="password"
                  onChange={(e) =>
                    setStudent({ ...student, password: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address"
                  required
                  name="address"
                  label="સરનામું"
                  multiline
                  fullWidth
                  variant="standard"
                  rows={3}
                  onChange={(e) =>
                    setStudent({ ...student, address: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="city"
                  required
                  name="city"
                  label="શહેર/ગામનું નામ"
                  fullWidth
                  variant="standard"
                  rows={3}
                  onChange={(e) =>
                    setStudent({ ...student, city: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="pincode"
                  name="pincode"
                  label="પીનકોડ"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    const inputValue = e.target.value.trim();
                    const pincodeValue = parseInt(inputValue);
                    setStudent({ ...student, pincode: pincodeValue });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="contact"
                  name="contact"
                  label="મોબાઈલ નંબર"
                  fullWidth
                  autoComplete="contact"
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, contact: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="whContact"
                  name="whContact"
                  label="વ્હોટ્સએપ નંબર"
                  fullWidth
                  autoComplete="contact"
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, whContact: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="parentContact"
                  name="parentContact"
                  label="વાલીનો નંબર"
                  fullWidth
                  autoComplete="contact"
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, parentContact: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="altContact"
                  name="altContact"
                  label="અન્ય નંબર"
                  fullWidth
                  autoComplete="contact"
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, altContact: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="જન્મ તારીખ" onChange={handleDateChange} />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="એડમિશન તારીખ"
                    onChange={handleDateChange2}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="lastSchool"
                  required
                  name="lastSchool"
                  label="આગળ અભ્યાસ કરેલ હોય તો શાળાની માહિતી"
                  fullWidth
                  variant="standard"
                  rows={3}
                  onChange={(e) =>
                    setStudent({ ...student, lastSchool: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="bloodGroup"
                  name="bloodgroup"
                  label="બ્લડ ગ્રુપ"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, bloodGroup: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="alergy"
                  name="alergy"
                  label="કોઈ એલર્જી?"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, alergy: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="dieces"
                  name="dieces"
                  label="કોઈ રોગ?"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, dieces: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="isSatsangi"
                  name="isSatsangi"
                  label="સત્સંગી છે?"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, isSatsangi: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="nearTemple"
                  name="nearTemple"
                  label="નજીકનું મંદિર"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, nearTemple: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="isBed"
                  name="isBed"
                  label="બેડિંગ લીધેલ છે?"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, isBed: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="isDish"
                  name="isDish"
                  label="ડીશ લીધેલ છે?"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setStudent({ ...student, isDish: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel id="select-hostel">Hostel</InputLabel>
                  <Select
                    labelId="select-hostel"
                    id="select-hostel1"
                    value={student.hostel}
                    label="Hostel"
                    onChange={(e) =>
                      setStudent({ ...student, hostel: e.target.value })
                    }
                  >
                    {menuHostel.map((item) => (
                      <MenuItem key={item.id} value={item.hostelName}>
                        {item.hostelName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
              <FormControl sx={{ width: "200px" }}>
              <InputLabel id="select-standard">Standard</InputLabel>
              <Select
                labelId="select-standard"
                id="select-standard"
                value={student.standard}
                label="Standard"
                onChange={(e) =>
                  setStudent({ ...student, standard: e.target.value })
                }
              >
                {menuClassRoom.map((item) => (
                  <MenuItem key={item.id} value={item.className}>
                    {item.className}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                  onClick={findStudent}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Find Student
                </Button>
                <Button
                  variant="outlined"
                  onClick={onbtnClick}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Add Student
                </Button>
              </Box>
            </Grid>
          </Paper>
          <Toaster position="bottom-right" reverseOrder={false} />
        </Container>
      </React.Fragment>
    </div>
  );
}
