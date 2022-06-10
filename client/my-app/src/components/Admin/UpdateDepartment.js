import React, { useState, useEffect } from "react";
import Axios from "axios";
import cogoToast from "cogo-toast";
import "rsuite/dist/rsuite.min.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import Modal from '@mui/material/Modal';
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';





// import MaterialUI from "./MaterialUI";

const UpdateDepartment = () => {
    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));
    

   

      
return(
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        
    <DrawerHeader />

<Box>
    <h1>UPD</h1>
</Box>
 
  </Box>


)
 
};
export default UpdateDepartment;
