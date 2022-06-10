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
import AddIcon from '@mui/icons-material/Add';

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

const Student = (props) => {
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

  const loggedInUser = localStorage.getItem("user");
  const foundUser=JSON.parse(loggedInUser);
  

  const [rows, setRows] = useState([]);

  useEffect(() => {


      if(loggedInUser)
      {
       navigate('/admin/student')
        
        
      }
      else 
      {
        navigate('/login')
      }
   
    Axios.post("http://localhost:3001/selectstudent").then((response) => {
      const teachers = response.data;
      // console.log(response.data.b[0].teacher_id);

      // console.log(teachers.b[0].teacher_id);
      setRows(response.data);
      console.log(response.data);
    });
  }, []);

  // function updateDepartment(e)
  // {

  // }

  function deleteStudent(e) {
    Axios.post("http://localhost:3001/deletestudent", { m: e }).then(
      (response) => {
        console.log(response.data);
      }
    );
  }

  function add_student()
  {
    navigate('/admin/student/add');
  }
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />

      <Box>
        
        <div>
        <Box>
      <Button variant="contained" endIcon={<AddIcon fontSize='large'/>} onClick={add_student}>
        Add Student
      </Button>
      </Box>
      <br/>
  

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Student_Id</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Student Email</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell align="left">Update and Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow
                    key={row.student_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.student_id}
                    </TableCell>
                    <TableCell align="left">{row.student_name}</TableCell>
                    <TableCell align="left">{row.student_email}</TableCell>
                    <TableCell align="left">{row.class_name}</TableCell>
                    <TableCell align="left">{row.department_name}</TableCell>

                    <TableCell component="th" scope="row">
                      <Button
                        variant="contained"
                        onClick={() => {
                          props.r(row.student_id);
                        }}
                      >
                        Update
                      </Button>
                      &nbsp; &nbsp;
                      <Button
                        variant="contained"
                        type="submit"
                        onClick={() => {
                          deleteStudent(row.student_id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
    </Box>
  );
};
export default Student;
