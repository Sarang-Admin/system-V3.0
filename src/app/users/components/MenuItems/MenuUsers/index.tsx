import React from "react";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';

const MenuUsers = [
  {
    name: "Admins",
    icon: <ManageAccountsOutlinedIcon />,
    href: "/users/admin/pages/adminManage"
  },
  {
    name: "Teachers",
    icon: <AssignmentIndOutlinedIcon />,
    href: "/users/admin/pages/teacherManage/addTeacher"
  },
  {
    name: "Students",
    icon: <SchoolOutlinedIcon />,
    href: "/users/admin/pages/studentManage/addStudent",
  },
  {
    name: "Staff",
    icon: <EngineeringOutlinedIcon />,
    href: "/users/admin/pages/staffManage"
  },
];

export default MenuUsers;
