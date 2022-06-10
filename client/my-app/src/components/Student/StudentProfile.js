import React, { useState, useEffect } from "react";
import Axios from "axios";
import cogoToast from "cogo-toast";
import "rsuite/dist/rsuite.min.css";
import { useNavigate ,useLocation} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
// import MaterialUI from "./MaterialUI";
const StudentProfile = (props) => {

  const navigate = useNavigate();
  const location = useLocation();

  const loggedInUser = localStorage.getItem("user");
  const foundUser=JSON.parse(loggedInUser);
  useEffect(() => {

    if(loggedInUser)
    {
     navigate('/student/profile')
      
      
    }
    else 
    {
      navigate('/login')
    }
    
 
   
  }, []);
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        
    <DrawerHeader />

<Box>
<h1>Email:{foundUser.f}</h1>

</Box>
 
  </Box>
  );
};
export default StudentProfile;
