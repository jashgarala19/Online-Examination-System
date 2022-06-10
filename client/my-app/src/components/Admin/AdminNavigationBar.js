import React, { useState, useEffect } from "react";
// import { Menu, MenuItem, SubMenu, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import People from "@mui/icons-material/People";
import PermMedia from "@mui/icons-material/PermMedia";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Dns from "@mui/icons-material/Dns";
import Public from "@mui/icons-material/Public";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";

import AdminDashboard from "./AdminDashboard";
import Teacher from "./Teacher";
import Class from "./Class";
import Course from "./Course";
import Student from "./Student";
import Department from "./Department";

import Class_Teacher from "./Class-Teacher";
import Department_Course from "./Department-Course";

import Profile from "../Profile";
import UpdateDepartment from "./UpdateDepartment";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const settings = ["Profile", "Dashboard", "Logout"];

// const data = [
//   { icon: <People />, label: "Authentication" },
//   { icon: <Dns />, label: "Database" },
//   { icon: <PermMedia />, label: "Storage" },
//   { icon: <Public />, label: "Hosting" },
// ];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AdminNavigationBar = (props) => {
  let navigate = useNavigate();

  const [alignment, setAlignment] = React.useState("web");
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [openTeacher, setOpenTeacher] = React.useState(false);
  const [openCourse, setOpenCourse] = React.useState(false);
  const [openClass, setOpenClass] = React.useState(false);
  const [openRelation, setOpenRelation] = React.useState(false);
  const [updateDepartmentt, setOpenDepartmentt] = React.useState(false);

  const [openMasterData, setOpenMasterData] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [headerText, setHeaderText] = React.useState("Dashboard");

  const [R, SetR] = useState(0); //for changing navigation menu
  var l;

  function updateDepartment() {
    SetR("updateDepartment");
  }

  const clickedMyMenu = (v) => {
    if (v == "Dashboard") {
      navigate("/admin/dashboard");
      setHeaderText("Dashboard");
    } else if (v == "teacher") {
      navigate("/admin/teacher");
      setHeaderText("Teacher");
    } else if (v == "department") {
      setHeaderText("Department");
      navigate("/admin/department");
    } else if (v == "class") {
      navigate("/admin/class");

      setHeaderText("Class");
    } else if (v == "course") {
      navigate("/admin/course");

      setHeaderText("Course");
    } else if (v == "student") {
      navigate("/admin/student");

      setHeaderText("Student");
    } else if (v == "Profile") {
      navigate("/admin/profile");
      setHeaderText("My Profile");
    } else if (v == "class-teacher") {
      navigate("/admin/class_teacher");
      setHeaderText("Class and Teacher");
    } else if (v == "department-course") {
      navigate("/admin/department_course");
      setHeaderText("Department and Course");
    } 
    else if (v == "course-teacher") {
      navigate("/admin/course_teacher");
      setHeaderText("Course and Teacher");
    } 
    else if (v == 0) {
      navigate("/admin/profile");
      setHeaderText("Profile");
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenTeacher(false);
    setOpenCourse(false);
    setOpenMasterData(false);
    setOpenRelation(false);
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (s) => {
    setAnchorElUser(null);
    console.log("pressed");
    if (s == "Logout") {
      props.logout();
    } else if (s == "Profile") {
      navigate("/admin/profile");
      setHeaderText("My Profile");
    } else if (s == "Dashboard") {
      navigate("/admin/dashboard");
      setHeaderText("Dashboard");
    }
  };

  const handleClick = (v) => {
    if (v == "Exam") {
      setOpenTeacher(!openTeacher);
    } else if (v == "Course") {
      setOpenCourse(!openCourse);
    } else if (v == "Class") {
      setOpenClass(!openClass);
    } else if (v == "MasterData") {
      setOpenMasterData(!openMasterData);
    } else if (v == "Relation") {
      setOpenRelation(!openRelation);
    }
  };

  const getIcon = (v) => {
    if (v == 1) {
      return <PersonIcon />;
    } else {
      return <MailIcon />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {headerText}
          </Typography>
          <Typography variant="h6" noWrap component="div" sx={{ p: 2 }}>
            Online Examination System
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={props.mydata.Firstname}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {["Dashboard"].map((text, index) => (
            <Tooltip title="Dashboard">
              <ListItemButton
                key={text}
                onClick={() => {
                  clickedMyMenu("Dashboard");
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
        <Divider />
        <List>
          <ListItemButton
            onClick={() => {
              handleClick("MasterData");
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="MasterData" />
            {openMasterData ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openMasterData} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  clickedMyMenu("department");
                }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Department" />
              </ListItemButton>
            </List>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                clickedMyMenu("class");
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Class" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                clickedMyMenu("course");
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Course" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                clickedMyMenu("teacher");
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Teacher" />
            </ListItemButton>

            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                clickedMyMenu("student");
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Student" />
            </ListItemButton>
          </Collapse>

          <ListItemButton
            onClick={() => {
              handleClick("Relation");
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Relation" />
            {openRelation ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openRelation} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  clickedMyMenu("class-teacher");
                }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Class-Teacher" />
              </ListItemButton>



              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  clickedMyMenu("course-teacher");
                }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Course-Teacher" />
              </ListItemButton>




              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  clickedMyMenu("department-course");
                }}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Department-Course" />
              </ListItemButton>





            </List>
          </Collapse>

          <Tooltip title="Profile">
            <ListItemButton
              key="Profile"
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                clickedMyMenu("Profile");
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Tooltip>
        </List>
      </Drawer>

      {props.comp}
    </Box>
  );
};
export default AdminNavigationBar;
