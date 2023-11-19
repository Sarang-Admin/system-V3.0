import React from "react";
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

const MenuManagement = [
  {
    name: "Hostel",
    icon: <HomeWorkOutlinedIcon />,
    href: "/users/admin/pages/hostelManage",
  },
  {
    name: "Transport",
    icon: <AirportShuttleOutlinedIcon />,
    href: "/users/admin/pages/transportManage",
  },
  {
    name: "Retail Store",
    icon: <StorefrontOutlinedIcon />,
    href: "/users/admin/pages/retailStore",
  },
];

export default MenuManagement;
