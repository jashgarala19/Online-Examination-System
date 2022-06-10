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

import AddIcon from "@mui/icons-material/Add";

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

const StudentResult = (props) => {
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
  const foundUser = JSON.parse(loggedInUser);

  useEffect(() => {
    if (loggedInUser) {
      navigate("/student/studentresult");
    } else {
      navigate("/login");
    }



    Axios.post("http://localhost:3001/getresult",{st:foundUser.f}).then((response) => {
     console.log(response.data)
     setRows(response.data)
    });


  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />

      <Box>
      <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Student_id</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Exam Name</TableCell>
                  <TableCell>Exam date</TableCell>
                  <TableCell>Marks Per Question</TableCell>
                  <TableCell>Marks</TableCell>
                  <TableCell>Marks Out Of</TableCell>
                 
           
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow
                    key={row.teacher_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.student_id}
                    </TableCell>
                    <TableCell align="left">{row.student_name}</TableCell>
                     <TableCell align="left">{row.Exam_name}</TableCell>
                     <TableCell align="left">{row.Exam_dt}</TableCell>
                     <TableCell align="left">{row.MarksPerQuestion}</TableCell>
                     <TableCell align="left">{row.marks}</TableCell>
                     <TableCell align="left">{row.marks_out_of}</TableCell>
                   

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Box>
    </Box>
  );
};
export default StudentResult;
