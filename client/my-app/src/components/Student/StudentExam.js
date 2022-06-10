import React, { useState, useEffect, useRef } from "react";
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
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";

import "sweetalert2/src/sweetalert2.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NewWindow from "rc-new-window";

import { useTimer } from "react-timer-hook";



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

const StudentExam = (props) => {
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

  var dt;
  const [examdetails, setExamDetails] = useState([]);

  const loggedInUser = localStorage.getItem("user");
  const foundUser = JSON.parse(loggedInUser);

  function gettime(date) {
    var hours = date.getHours("2022-06-15T07:35");
    var minutes = date.getMinutes("2022-06-15T07:35");
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  function getdate() {
    var today = new Date("2022-06-15T23:35");
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;
    return today;
  }
  var add_minutes = function (dt, minutes) {
    return new Date(dt.getTime() + minutes * 60000);
  };

  const checkdatetime = (r, total_time,examid) => {
    var currentdate = new Date();
    console.log(currentdate);
    var userdate = new Date(r);
    console.log(userdate);

    var time_ended = add_minutes(new Date(r), total_time);
    console.log(time_ended);

    if (currentdate > userdate && currentdate < time_ended) {
      Axios.post("http://localhost:3001/getmyexam",{q:examid}).then(
        (response) => {
          localStorage.setItem("examdetails", JSON.stringify(response.data));

        }
      );

      Axios.post("http://localhost:3001/getmyquestions",{r:examid}).then(
        (response) => {
          localStorage.setItem("myquestions", JSON.stringify(response.data));
          
       

        }
      );

     
   

  
      navigate('/student/Exam/InExam')
      // setOpen((v) => !v);
    } else if (currentdate < userdate) {
      cogoToast.error("Exam not started ");
    } else {
      cogoToast.error("Exam over  ");
    }
  };
  useEffect(() => {
    Axios.post("http://localhost:3001/getexamdetails", { s: foundUser.f }).then(
      (response) => {
        // const examdatetime = response.data[1].Exam_dt

        // console.log(examdatetime)

        var date2 = new Date();
        const userdatetime = date2.toLocaleString("en-GB");
        console.log(userdatetime);

        // var date3 = new Date();
        //  const datetimenow = date3.toLocaleString('en-GB');

        // const date = getdate(examdatetime);
        // console.log(date);
        //     const time = gettime(new Date);
        // console.log(time);
        // const user_date = examdatetime.slice(0,10)
        // const  user_time = examdatetime.slice(11)

        console.log(response.data);

        setExamDetails(response.data);
      }
    );
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />

      <Box>
        <div>
          <h1> Give Exam</h1>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Exam Name</TableCell>
                  <TableCell align="left">Exam Date and Time</TableCell>
                  <TableCell align="left">Exam total time</TableCell>
                  <TableCell align="left">Marks Per Question</TableCell>
                  <TableCell align="left">Total Questions</TableCell>
                  <TableCell align="left">Teacher Name</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {examdetails.map((row) => (
                  <TableRow
                    key={row.exam_name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.exam_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.Exam_dt}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {row.Exam_total_time}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.MarksPerQuestion}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.total_questions}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.teacher_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        variant="contained"
                        disabled={false}
                        onClick={() => {
                          checkdatetime(row.Exam_dt, row.Exam_total_time,row.exam_id);
                        }}
                      >
                        Give Exam
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

export default StudentExam;
