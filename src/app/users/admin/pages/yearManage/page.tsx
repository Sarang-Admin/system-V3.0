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
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";

interface DataItem {
  year: number;
}

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
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
  { field: "academicYear", headerName: "Academic Year", width: 130 },
  {
    field: "Delete",
    headerName: "Delete",
    width: 100,
    editable: true,
  },
];

export default function ManageYear() {
  const router = useRouter();

  const [acayear, setacaYear] = React.useState({
    year: 0,
  });

  const [data, setData] = React.useState<DataItem[]>([]);
  const [dataUpdated, setDataUpdated] = React.useState(false);
  const onbtnClick = async () => {
    try {
      await axios.post("/api/users/admin/academicYear", acayear);
      router.refresh();
      toast.success("Academic Year added successfully");
      setacaYear({
        year: 0,
      });
      setDataUpdated(true);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (year: number) => {
    try {
      await axios.delete("/api/users/admin/academicYear/");
      // Update the data state to remove the deleted row
      const newData = data.filter((item) => item.year !== year);
      setData(newData);
    } catch (error: any) {
      // Handle error
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [dataUpdated]);

  async function fetchData() {
    try {
      const response = await fetch("/api/users/admin/academicYear");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { years } = await response.json();
      setData(years);
      setDataUpdated(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <>
      <Box sx={{ margin: 3 }}>
        <Typography fontSize={32}>Add Acadamic Year</Typography>
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
              value={acayear.year}
              required
              id="outlined-required"
              type="number"
              label="Year"
              sx={{ marginTop: 2, marginBottom: 2 }}
              onChange={(e) =>
                setacaYear({ ...acayear, year: parseInt(e.target.value, 10) })
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
              Add Year
            </Button>
          </Item>
        </Grid>
        <Grid xs={12} md={8} sx={{ backgroundColor: "#EEEEEE" }}>
          <Item>
            <DataGrid
              rows={data.map((item, index) => ({
                id: index + 1,
                academicYear: item.year,
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
