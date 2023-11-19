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

interface DataItem {
  hostelName: string;
  rooms: number;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "hostelName", headerName: "Hostel Name", width: 200 },
  { field: "rooms", headerName: "Rooms", width: 130 },
];

export default function ManageHostel() {
  const router = useRouter();
  
  const [hostel, setHostel] = React.useState({
    hostelName: "",
  });

  const [data, setData] = React.useState<DataItem[]>([]);
  const [dataUpdated, setDataUpdated] = React.useState(false);

  const onbtnClick = async () => {
    try {
      await axios.post("/api/users/admin/hostel", hostel);
      router.refresh();
      toast.success("Hostel added successfully");
      setHostel({
        hostelName: "",
      });
      setDataUpdated(true);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    
    fetchData();
  }, [dataUpdated]);

  async function fetchData() {
    try {
      const response = await fetch("/api/users/admin/hostel");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { hostels } = await response.json();
      const dataWithRoomsCount: DataItem[] = hostels.map((hostel: any, index: any) => ({
        id: index + 1,
        hostelName: hostel.hostelName,
        rooms: hostel.roomCount, // Assuming you have a roomsCount property from the server
      }));
      setData(dataWithRoomsCount);
      setDataUpdated(false);
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
            <TextField
              value={hostel.hostelName}
              required
              id="hostelName"
              label="Hostel Name"
              sx={{ marginTop: 2, marginBottom: 2 }}
              onChange={(e) =>
                setHostel({ ...hostel, hostelName: e.target.value })
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
              Add Hostel
            </Button>
            <Button
              variant="outlined"
              sx={{ marginTop: 2, marginBottom: 2, marginLeft: 3 }}
              onClick={() => {
                router.push("/users/admin/pages/hostelRoomManage");
              }}
            >
              Manage Rooms
            </Button>
          </Item>
        </Grid>
        <Grid xs={12} md={8} sx={{ backgroundColor: "#EEEEEE" }}>
          <Item>
            <DataGrid
              rows={data}
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
