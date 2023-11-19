"use client";
import { DownloadOutlined } from "@mui/icons-material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import Button from "@mui/material/Button";
import { Box, useTheme } from "@mui/material";


export default function Dashboard() {
  const theme = useTheme();
  return (
    <div>
      <Box sx={{
        textAlign: "right"
      }}>
      <Button sx={{
        padding: "6px 8px",
        textTransform: "capitalize",
        color: theme.palette.primary.main,
        marginBottom: "10px",
      }} variant="outlined">
        <DownloadOutlined />
        Downlaod Reports
      </Button>
      </Box>
      <Row1 />
      <Row2 />
      <Row3 />
    </div>
  );
}
