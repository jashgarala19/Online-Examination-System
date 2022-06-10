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

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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

const Course_Teacher = (props) => {
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

  const [getCourse, setCourse] = useState([]);

  const [getTeacher, setTeacher] = useState([]);


  const [t, setT] = React.useState("");

  // const [getCourses, setCourses] = useState([]);
  const loggedInUser = localStorage.getItem("user");
  const foundUser = JSON.parse(loggedInUser);

  const [checked, setChecked] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    Axios.post("http://localhost:3001/addcourseteacher", { s: data }).then(
        (response) => {
  
  
  
  
        }
      );
  };
  const handleChange = (event) => {
    // setChecked(false);
    setT(event.target.value);
   

    Axios.post("http://localhost:3001/getteacherdepartment", { c: event.target.value }).then(
      (response) => {
     setCourse(response.data)
        console.log(response.data);
     
      }
    );
  };

  useEffect(() => {
    if (loggedInUser) {
      navigate("/admin/course_teacher/");
    } else {
      navigate("/login");
    }
  

    Axios.post("http://localhost:3001/getteachername").then((response) => {
      setTeacher(response.data);
    });
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />

      <Box>
        <h3>Course and Teacher Relation</h3>
        <div>
          &nbsp;
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ minWidth: 220 }}>
              <FormControl sx={{ minWidth: 220 }}>
                <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                <Select
                  {...register("teacher_name")}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={t}
                  label="Teacher"
                  onChange={handleChange}
                  // onClick={() => setChecked((c) => !c)}
                  // onClick={() =>setChecked(!checked)}
                >
                  {getTeacher.map((t, i) => {
                    return (
                      <MenuItem value={t.teacher_name}>
                        {t.teacher_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <br />
        
            <Box sx={{ minWidth: 220 }}>
              <FormGroup>
                {getCourse.map((e, i) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register("values", { required: false })}
                        />
                      }
                      label={e.course_name}
                      value={e.course_name}
                      // defaultChecked={checked}
                    />
                  );
                })}
              </FormGroup>
            </Box>
            <Button variant="contained" type="submit">
              Add Course Teacher
            </Button>
          </form>
        </div>
      </Box>
    </Box>
  );
};
export default Course_Teacher;
