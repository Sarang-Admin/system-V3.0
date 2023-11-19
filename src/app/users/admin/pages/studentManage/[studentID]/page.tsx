"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Home, Person, Phone } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Toolbar,
} from "@mui/material";
import { useParams } from "next/navigation";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MasksIcon from "@mui/icons-material/Masks";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import DoorbellIcon from "@mui/icons-material/Doorbell";
import BedIcon from "@mui/icons-material/Bed";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import toast, { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useRouter } from "next/navigation";

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}



const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: "1px solid #ddd",
        transition: "background-color 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(76, 175, 80, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <div style={{ marginRight: 10 }}>{icon}</div>
      <div>
        <Typography variant="subtitle1">{label}</Typography>
        <Typography variant="body1" color="textSecondary">
          {value}
        </Typography>
      </div>
    </div>
  );
};

function formatDate(inputDate: string) {
  // Parse the input date string
  const date = new Date(inputDate);

  // Get day, month, and year from the date object
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  const year = date.getFullYear();

  // Pad day and month with leading zeros if necessary
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Construct the formatted date string in "dd/mm/yyyy" format
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
}

export default function StudentProfile() {
  const { studentID } = useParams();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const router = useRouter();
  const [data, setData] = React.useState({
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
    motherName: "",
    address: "",
    contact: "",
    altContact: "",
    whContact: "",
    parentContact: "",
    city: "",
    pincode: 0,
    dob: "",
    admissionDate: "",
    bloodGroup: "",
    lastSchool: "",
    isSatsangi: "",
    nearTemple: "",
    alergy: "",
    dieces: "",
    isDish: "",
    isBed: "",
  });
  const [dataUpdated, setDataUpdated] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  

  React.useEffect(() => {
    fetchData();
  }, [dataUpdated]);
  async function fetchData() {
    try {
      const response = await fetch(`/api/users/admin/student/${studentID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { student } = await response.json();
      if (student) {
        setData(student);
      } else {
        console.error("Student data not found in the response:", response);
      }
      setDataUpdated(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const formatedDob = formatDate(data.dob);
  const formatedJoiningDate = formatDate(data.admissionDate);
  

  
  return (
    <div>
      <div style={{ padding: 16 }}>
        <Paper
          elevation={3}
          style={{
            padding: 16,
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            alignItems: isSmallScreen ? "center" : "flex-start",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: isSmallScreen ? 16 : 0,
              marginRight: isSmallScreen ? 0 : 20,
            }}
          >
            <Avatar
              alt="User Profile Picture"
              src="/images/student.jpg"
              sx={{ width: 120, height: 120, border: "4px solid #fff" }}
            />
            <Typography variant="h5" style={{ margin: "8px 0" }}>
              {data.firstName} {data.lastName}
            </Typography>
            <img
              src="/images/qr-code.png"
              alt="QR Code"
              style={{ width: 80, height: 80, marginTop: 16 }}
            />
            <Typography variant="h6" style={{ margin: "8px 0" }}>
              <b>Student ID:</b> {data.studentID}
            </Typography>
            <Typography variant="h6" style={{ margin: "8px 0" }}>
              <b>Standard:</b> {data.standard}
            </Typography>
            <Typography variant="h6" style={{ margin: "8px 0" }}>
              <b>Hostel:</b> {data.hostel}
            </Typography>
            <Typography variant="h6" style={{ margin: "8px 0" }}>
              <b>Room Number:</b> {data.hostelRoom}
            </Typography>
            <Button variant="outlined">Edit User</Button>
            <Button variant="outlined" style={{ marginTop: "10px" }}>
              Delete User
            </Button>
            <Button
              variant="outlined"
              style={{ marginTop: "10px" }}
              href={"/users/admin/pages/gatepassManage/"}
            >
              Generate GatePass
            </Button>
            <Button
              variant="outlined"
              style={{ marginTop: "10px" }}
              href={`/users/admin/pages/gatepassManage/${studentID}`}
            >
              View GatePass
            </Button>
            
          </div>
          <div style={{ flex: 1 }}>
            <Typography variant="h5" style={{ marginBottom: 16 }}>
              Student Information
            </Typography>
            <div>
              <InfoRow
                icon={<Person fontSize="medium" />}
                label="વિદ્યાર્થીનું નામ"
                value={data.firstName + " " + data.lastName}
              />
              <InfoRow
                icon={<Person fontSize="medium" />}
                label="પિતાનું નામ"
                value={data.fatherName + " " + data.lastName}
              />
              <InfoRow
                icon={<Person fontSize="medium" />}
                label="માતાનું નામ"
                value={data.motherName + " " + data.lastName}
              />
              <InfoRow
                icon={<Phone fontSize="medium" />}
                label="મોબાઈલ નંબર"
                value={data.contact}
              />
              <InfoRow
                icon={<WhatsAppIcon fontSize="medium" />}
                label="વ્હોટ્સએપ નંબર"
                value={data.whContact}
              />
              <InfoRow
                icon={<Phone fontSize="medium" />}
                label="વાલીનો નંબર"
                value={data.parentContact}
              />
              <InfoRow
                icon={<Phone fontSize="medium" />}
                label="અન્ય નંબર"
                value={data.altContact}
              />
              <InfoRow
                icon={<Home fontSize="medium" />}
                label="સરનામું"
                value={data.address}
              />
              <InfoRow
                icon={<Home fontSize="medium" />}
                label="શહેર/ગામનું નામ"
                value={data.city}
              />
              <InfoRow
                icon={<Home fontSize="medium" />}
                label="પીનકોડ"
                value={String(data.pincode)}
              />
              <InfoRow
                icon={<CalendarMonthIcon fontSize="medium" />}
                label="જન્મ તારીખ"
                value={formatedDob}
              />
              <InfoRow
                icon={<DateRangeIcon fontSize="medium" />}
                label="એડમિશન તારીખ"
                value={formatedJoiningDate}
              />
              <InfoRow
                icon={<SchoolIcon fontSize="medium" />}
                label="આગળ અભ્યાસ કરેલ હોય તો શાળાની માહિતી"
                value={data.lastSchool}
              />
              <InfoRow
                icon={<BloodtypeIcon fontSize="medium" />}
                label="બ્લડ ગ્રુપ"
                value={data.bloodGroup}
              />
              <InfoRow
                icon={<MasksIcon fontSize="medium" />}
                label="કોઈ એલર્જી?"
                value={data.alergy}
              />
              <InfoRow
                icon={<LocalHospitalIcon fontSize="medium" />}
                label="કોઈ રોગ?"
                value={data.dieces}
              />
              <InfoRow
                icon={<Diversity3Icon fontSize="medium" />}
                label="સત્સંગી છે?"
                value={data.isSatsangi}
              />
              <InfoRow
                icon={<DoorbellIcon fontSize="medium" />}
                label="નજીકનું મંદિર"
                value={data.nearTemple}
              />
              <InfoRow
                icon={<BedIcon fontSize="medium" />}
                label="બેડિંગ લીધેલ છે?"
                value={data.isBed}
              />
              <InfoRow
                icon={<RadioButtonCheckedIcon fontSize="medium" />}
                label="ડીશ લીધેલ છે?"
                value={data.isDish}
              />
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
