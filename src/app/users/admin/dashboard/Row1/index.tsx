"use client";
import Stack from "@mui/material/Stack";
import React from "react";
import Card from "../components/Card";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useTheme } from "@mui/material";
import { data1, data2, data3, data4 } from "../components/chartData";

const Row1 = () => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      gap={1}
      justifyContent={{ xs: "center", sm: "space-between" }}
      marginBottom={3}
    >
      <Card
        icon={<SchoolIcon sx={{ fontSize: "35px", color: theme.palette.primary.main }} />}
        title={"875"}
        subTitle={"Student"}
        data = {data1}
        chartDesc={"+15%"}
        scheme = {"category10"}
      />
      <Card
        icon={<LocalLibraryIcon sx={{ fontSize: "35px", color: theme.palette.primary.main }} />}
        title={"78"}
        subTitle={"Teachers"}
        data = {data2}
        chartDesc={"+35%"}
        scheme = {"dark2"}
      />
      <Card
        icon={<RoomPreferencesIcon sx={{ fontSize: "35px", color: theme.palette.primary.main }} />}
        title={"22"}
        subTitle={"Classes"}
        data = {data3}
        chartDesc={"+65%"}
        scheme = {"nivo"}
      />
      <Card
        icon={<MenuBookIcon sx={{ fontSize: "35px", color: theme.palette.primary.main }} />}
        title={"18"}
        subTitle={"Subjects"}
        data = {data4}
        chartDesc={'38%'}
        scheme = {"paired"}
      />
    </Stack>
  );
};

export default Row1;
