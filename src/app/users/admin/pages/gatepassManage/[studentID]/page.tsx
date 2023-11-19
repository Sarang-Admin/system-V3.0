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
import { Button, Grid } from "@mui/material";
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

export default function ViewGatepass() {
  const { studentID } = useParams();
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const today = new Date();
  const [data, setData] = React.useState({
    gatepassID: "",
    studentID: "",
    careTaker: "",
    leavingDate: null,
    time: "",
    reason: "",
    returnDate: null,
  });
  const [dataUpdated, setDataUpdated] = React.useState(false);

  React.useEffect(() => {
    fetchData();
  }, [dataUpdated]);
  async function fetchData() {
    try {
      const response = await fetch(`/api/users/admin/gatepass/${studentID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { gatepass } = await response.json();
      if (gatepass) {
        setData(gatepass);
      } else {
        console.error("Gatepass not found in the response:", response);
      }
      setDataUpdated(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const formatedDob = formatDate(data.dob);
  const formatedJoiningDate = formatDate(data.joiningDate);
  return (
    <div>
      <div style={{ padding: 16 }}>
        <Paper
          elevation={3}
          style={{
            padding: 16,
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ flex: 1 }}>
            <Typography style={{ marginBottom: 16 }} align="center">
              || શ્રી સ્વામિનારાયણો વિજયતે ||
            </Typography>
            <Typography
              variant="h5"
              style={{ marginBottom: 16 }}
              align="center"
            >
              BAPS સ્વામિનારાયણ વિદ્યામંદિર, સારંગપુર
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                I.D. No: {studentID}
              </Grid>
              <Grid item xs={12} sm={6}>
                તારીખ: {today.toLocaleDateString()} સમય:{" "}
                {today.toLocaleTimeString()}
              </Grid>
            </Grid>
          </div>
        </Paper>
      </div>
    </div>
  );
}
