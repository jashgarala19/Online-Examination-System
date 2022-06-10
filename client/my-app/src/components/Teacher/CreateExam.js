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
import { Controller,useForm } from "react-hook-form";

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
import { DateTimePicker } from "@mui/lab";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem';

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

const CreateExam = (props) => {
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


  const [c, setC] = useState([]);
  const [a, setA] = useState('');


  const [b, setB] = useState('');

  const [exam_name,setExam_name] = useState([]);
  const [datetime, setDateTime] = React.useState(new Date());
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // var e = formatDate(value);
    // console.log(e)
    console.log(datetime)

    console.log(data)
    Axios.post("http://localhost:3001/createexam",{ex:data}).then(
      (response) => {
      



     
      }
    
    );
    navigate('/teacher/Exam')
  };

  

  const handleChange2 = (event) => {
    setA(event.target.value);
  };

  const handleChange3 = (event) => {
    setB(event.target.value);
  };
  const handleChangeDateTimePicker = (event) => {
    setDateTime(event);
  }

  useEffect(() => {
    
    if (loggedInUser) {
      navigate("/teacher/Exam/add");
    } else {
      navigate("/login");
    }
    Axios.post("http://localhost:3001/getteacher", { email: foundUser.f }).then(
      (response) => {
        // console.log(response.data.res[0].course_name);
        // console.log(response.data.dep)

        console.log(response.data.class);
        setC(response.data.class);
      }
    );

    Axios.post("http://localhost:3001/getquestionbank",{t:foundUser.f}).then(
      (response) => {
      
setExam_name(response.data.exam_n)


     
      }
    );
  }, []);



  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />

      <Box>
        <h3>Create Exam</h3>
        <div>
          &nbsp;
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="outlined-basic"
              label="Exam Name"
              variant="outlined"
              {...register("exam_name")}
            />
            <br />
            <br />

            {/* <TextField
              id="outlined-basic"
              label="Number of questions"
              variant="outlined"
              type="number"
              {...register("total_questions")}
            />
            <br />
            <br /> */}
             <TextField
               {...register("date_time")}
        id="datetime-local"
        label="Date and Time"
        type="datetime-local"
        variant="outlined"
        sx={{ width: 250 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
          
            {/* <DateTimePicker
             {...register("date_time")} 
              renderInput={
                
                (params) => <TextField {...params}  />
            

            }
              label="DateTime picker"
              value={datetime}
             
              onChange={(newValue) => {
                setDateTime(newValue);
              }}
              
           
             
            /> */}



            <br />
            <br />

            <TextField
              id="outlined-basic"
              label="Total Time In Minutes"
              variant="outlined"
              type="number"
              InputProps={{
                inputProps: { 
                   min: 1
                }
            }}
              {...register("total_time")}
            />
            <br />
            <br />
            <Box sx={{minWidth:220}} >
      <FormControl sx={{minWidth:220}} >
        <InputLabel id="demo-simple-select-label">Select Class</InputLabel>

            <Select
            {...register("class_name")}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={a}
              label="Select Class"
              onChange={handleChange2}
            >
              {c.map((e, i) => {
                return (
                  <MenuItem value={e.class_name}>
                    {e.class_name}
                  </MenuItem>
                );
              })}
            </Select>
            </FormControl>
    </Box>
            <br/>


<Box sx={{minWidth:220}} >
      <FormControl sx={{minWidth:220}} >
        <InputLabel id="demo-simple-select-label">Select Question Bank</InputLabel>

            <Select
          {...register("qb_name")}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={b}
              label="Select Question Bank"
              onChange={handleChange3}
            >
              {exam_name.map((e, i) => {
                return (
                  <MenuItem value={e.QuestionBank_Name}>
               
                    {
                     e.QuestionBank_Name
                    }
                  </MenuItem>
                );
              })}
            </Select>
            </FormControl>
    </Box>
            <br/>
<br/>
            <Button variant="contained" type="submit" >
              Create Exam
            </Button>
          </form>
        </div>
      </Box>
    </Box>
  );
};
export default CreateExam;
