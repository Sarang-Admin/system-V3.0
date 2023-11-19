import React from "react";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import RoomPreferencesOutlinedIcon from '@mui/icons-material/RoomPreferencesOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';

const MenuSchool = [
  {
    name: "Acadmic Year",
    icon: <CalendarMonthOutlinedIcon />,
    href: "/users/admin/pages/yearManage",
  },
  {
    name: "Classes",
    icon: <RoomPreferencesOutlinedIcon />,
    href: "/users/admin/pages/classManage",
  },
  {
    name: "Subjects",
    icon: <MenuBookOutlinedIcon />,
    href: "/users/admin/pages/subjectManage",
  },
  {
    name: "Result",
    icon: <PollOutlinedIcon />,
    href: "/users/admin/pages/resultManage",
  },
];

export default MenuSchool;
