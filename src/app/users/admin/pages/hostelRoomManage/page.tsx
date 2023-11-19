"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface DataItems {
  id: string;
  roomID: string;
  roomNumber: number;
  capacity: number;
  hostelName: string;
};

interface HostelItem {
  id: string;
  hostelName: string;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "roomID", headerName: "Room ID", width: 120 },
  { field: "roomNumber", headerName: "Room Number", width: 110 },
  { field: "capacity", headerName: "Capacity", width: 70 },
  { field: "hostelName", headerName: "Hostel Name", width: 200 },
];

export default function ManageHostelRooms() {
  const router = useRouter();
  const [hostelRoom, setHostelRoom] = React.useState({
    roomID: "",
    roomNumber: 0,
    capacity: 0,
    hostelName: "",
  });

  const [data, setData] = React.useState<DataItems[]>([]);
  const [dataUpdated, setDataUpdated] = React.useState(false);
  const [menuHostel, setMenuHostel] = React.useState<HostelItem[]>([]);
  const onbtnClick = async () => {
    try {
      await axios.post("/api/users/admin/hostelRoom", hostelRoom);
      router.refresh();
      toast.success("Hostel added successfully");
      setHostelRoom({
        roomID: "",
        roomNumber: 0,
        capacity: 0,
        hostelName: "",
      });
      setDataUpdated(true);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    fetchData();
    fetchHostel();
  }, [dataUpdated]);

  async function fetchData() {
    try {
      const response = await fetch("/api/users/admin/hostelRoom");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { hostelRooms } = await response.json();
      if (hostelRooms) {
        setData(hostelRooms);
      } else {
        console.error("Hostels data not found in the response:", response);
      }
      setDataUpdated(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchHostel() {
    try {
      const response = await fetch("/api/users/admin/hostel");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { hostels } = await response.json();
      setMenuHostel(hostels);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <>
      <Box sx={{ margin: 3 }}>
        <Typography fontSize={32}>Add Hostel</Typography>
      </Box>
      <Grid
        container
        alignContent={"space-evenly"}
        spacing={3}
        sx={{ backgroundColor: "#EEEEEE" }}
      >
        <Grid xs={12} md={4}>
          <Item>
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="select-hostel">Hostel</InputLabel>
              <Select
                labelId="select-hostel"
                id="select-hostel1"
                value={hostelRoom.hostelName}
                label="Hostel"
                onChange={(e) =>
                  setHostelRoom({ ...hostelRoom, hostelName: e.target.value })
                }
              >
                {menuHostel.map((item) => (
                  <MenuItem key={item.id} value={item.hostelName}>
                    {item.hostelName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Item>
          <Item>
            <TextField
              value={hostelRoom.roomID}
              required
              id="roomID"
              label="Room ID"
              sx={{ marginTop: 2, marginBottom: 2 }}
              onChange={(e) =>
                setHostelRoom({ ...hostelRoom, roomID: e.target.value })
              }
            />
          </Item>
          <Item>
            <TextField
              value={hostelRoom.roomNumber.toString()}
              required
              id="roomNumber"
              label="Room Number"
              type="number"
              sx={{ marginTop: 2, marginBottom: 2 }}
              onChange={(e) =>
                setHostelRoom({
                  ...hostelRoom,
                  roomNumber: parseInt(e.target.value, 10), // Convert input to a number
                })
              }
            />
          </Item>
          <Item>
            <TextField
              value={hostelRoom.capacity.toString()}
              required
              id="roomCapacity"
              label="Capacity"
              type="number"
              sx={{ marginTop: 2, marginBottom: 2 }}
              onChange={(e) =>
                setHostelRoom({
                  ...hostelRoom,
                  capacity: parseInt(e.target.value, 10), // Convert input to a number
                })
              }
            />
          </Item>
          <Item>
            <Button
              variant="outlined"
              sx={{ marginTop: 2, marginBottom: 2 }}
              onClick={() => {
                onbtnClick();
              }}
            >
              Add Hostel Room
            </Button>
          </Item>
        </Grid>
        <Grid xs={12} md={8} sx={{ backgroundColor: "#EEEEEE" }}>
          <Item>
            <DataGrid
              rows={...data.map((item, index) => ({
                id: index + 1,
                hostelName: item.hostelName,
                roomID: item.roomID,
                roomNumber: item.roomNumber,
                capacity: item.capacity,
              }))}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </Item>
        </Grid>
        <Toaster position="bottom-right" reverseOrder={false} />
      </Grid>
    </>
  );
}
