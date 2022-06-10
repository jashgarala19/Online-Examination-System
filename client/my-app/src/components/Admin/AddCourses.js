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

import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// import MaterialUI from "./MaterialUI";

const AddCourses = (props) => {
  let navigate = useNavigate();
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [rows, setRows] = useState([]);
  const loggedInUser = localStorage.getItem("user");
  const foundUser=JSON.parse(loggedInUser);
  

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const course_name = data;

    Axios.post("http://localhost:3001/addcourses", { c: course_name }).then(
      (response) => {
        cogoToast.success("Success");
      }
    );

      navigate('/admin/course');
  };


  useEffect(()=>{

    if(loggedInUser)
    {
     navigate('/admin/course/add')
      
      
    }
    else 
    {
      navigate('/login')
    }
  },[])

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />

      <Box>
        <h3>Add Course</h3>
        <div>
          &nbsp;
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="outlined-basic"
              label="Course Name"
              variant="outlined"
              {...register("course_name")}
            />
            <br />
            <br />

            <Button variant="contained" type="submit">
              Add Course
            </Button>
          </form>
        </div>
      </Box>
    </Box>
  );
};
export default AddCourses;
