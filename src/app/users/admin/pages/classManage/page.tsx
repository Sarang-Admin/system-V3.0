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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface DataItem {
  className: string;
  year: number;
}

interface YearItem {
  id: string;
  year: number;
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
  { field: "className", headerName: "Class Name", width: 130 },
  { field: "year", headerName: "Year", width: 130 },
];

export default function ManageClass() {
  const router = useRouter();
  const [class1, setClass1] = React.useState({
    className: "",
    year: "",
  });

  const [data, setData] = React.useState<DataItem[]>([]);
  const [menuYear, setMenuYear] = React.useState<YearItem[]>([]);
  const [dataUpdated, setDataUpdated] = React.useState(false);

  const onbtnClick = async () => {
    try {
      const res1 = await axios.post("/api/users/admin/classRoom", class1);
      router.refresh();
      toast.success("Class added successfully");
      class1.className = "";
      class1.year = "";
      setDataUpdated(true);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    fetchData();
    fetchYear();
  }, [dataUpdated]);

  async function fetchData() {
    try {
      const response = await fetch("/api/users/admin/classRoom");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { classes } = await response.json();
      
      setData(classes);
      setDataUpdated(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchYear() {
    try {
      const response = await fetch("/api/users/admin/academicYear");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const { years } = await response.json();
      setMenuYear(years);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <>
      <Box sx={{ margin: 3 }}>
        <Typography fontSize={32}>Add Class</Typography>
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
              value={class1.className}
              required
              id="className"
              label="Class Name"
              sx={{ marginTop: 2, marginBottom: 2 }}
              onChange={(e) =>
                setClass1({ ...class1, className: e.target.value })
              }
            />
          </Item>
          <Item>
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">
                Academic Year
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={class1.year}
                label="Academic Year"
                onChange={(e) => setClass1({ ...class1, year: e.target.value })}
              >
                {menuYear.map((item) => (
                  <MenuItem key={item.id} value={item.year}>
                    {item.year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Item>
          <Item>
            <Button
              variant="outlined"
              sx={{ marginTop: 2, marginBottom: 2 }}
              onClick={() => {
                onbtnClick();
              }}
            >
              Add Class
            </Button>
          </Item>
        </Grid>
        <Grid xs={12} md={8} sx={{ backgroundColor: "#EEEEEE" }}>
          <Item>
            <DataGrid
              rows={...data.map((item, index) => ({
                id: index + 1,
                className: item.className,
                year: item.year,
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
