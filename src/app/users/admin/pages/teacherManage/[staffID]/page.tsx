"use client";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Home, Person, Phone } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import { Button } from "@mui/material";
import { useParams } from "next/navigation";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

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

export default function TeacherProfile() {
  const { staffID } = useParams();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const [data, setData] = React.useState({
    staffID: "",
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    contact: "",
    dob: "",
    joiningDate: "",
    bloodGroup: "",
    userType: "",
  });
  const [dataUpdated, setDataUpdated] = React.useState(false);

  React.useEffect(() => {
    fetchData();
    
   }, [dataUpdated]);
  async function fetchData() {
    try {
      const response = await fetch(`/api/users/admin/findTeacher/${staffID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { teacher } = await response.json();
      if (teacher) {
        setData(teacher);
      } else {
        console.error("Teacher data not found in the response:", response);
      }
      setDataUpdated(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const formatedDob = formatDate(data.dob);
  const formatedJoiningDate = formatDate(data.joiningDate)
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
              src="/images/admin.jpg"
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
              <b>Employee ID:</b> {data.staffID}
            </Typography>
            <Button variant="outlined">Edit User</Button>
            <Button variant="outlined" style={{ marginTop: "10px" }}>
              Delete User
            </Button>
          </div>
          <div style={{ flex: 1 }}>
            <Typography variant="h5" style={{ marginBottom: 16 }}>
              User Information
            </Typography>
            <div>
              <InfoRow
                icon={<Person fontSize="medium" />}
                label="Full Name"
                value={data.firstName + " " + data.lastName}
              />
              <InfoRow
                icon={<Phone fontSize="medium" />}
                label="Contact Number"
                value={data.contact}
              />
              <InfoRow
                icon={<Home fontSize="medium" />}
                label="Address"
                value={data.address}
              />
              <InfoRow
                icon={<AttachEmailIcon fontSize="medium" />}
                label="Email Address"
                value={data.email}
              />
              <InfoRow
                icon={<CalendarMonthIcon fontSize="medium" />}
                label="Birth Date"
                value={formatedDob}
              />
              <InfoRow
                icon={<DateRangeIcon fontSize="medium" />}
                label="Joining Date"
                value={formatedJoiningDate}
              />
              <InfoRow
                icon={<BloodtypeIcon fontSize="medium" />}
                label="Blood Group"
                value={data.bloodGroup}
              />
              {/* Add more user information rows here */}
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
