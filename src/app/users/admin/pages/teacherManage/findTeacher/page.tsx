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



export default function FindTeacher() {
  const router = useRouter();
  const [staffID, setStaffID] = React.useState("");
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/admin/findTeacher/${staffID}`);
      if (response.ok) {
        router.push(`/users/admin/pages/teacherManage/${staffID}`);
      } else {
        console.error("Teacher not found");
      }
    } catch (error) {
      console.error("Error searching for teacher:", error);
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
            Find Teacher
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            marginBottom={4}
          >
            Teacher Information
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="teacherID"
                name="teacherID"
                label="Teacher ID"
                fullWidth
                variant="standard"
                value={staffID}
                onChange={(e) => setStaffID(e.target.value)}
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
                onClick={handleSubmit}
                sx={{ mt: 3, ml: 1 }}
              >
                Find Teacher
              </Button>
            </Box>
          </Grid>
        </Paper>
       
      </Container>
    </React.Fragment>
  );
}
