// import React, { useState, useEffect } from "react";
// import Axios from "axios";
// import cogoToast from "cogo-toast";
// import "rsuite/dist/rsuite.min.css";
// import { useNavigate } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { styled, useTheme } from "@mui/material/styles";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import { useForm } from "react-hook-form";
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";

// // import MaterialUI from "./MaterialUI";
// const AddTeacher = () => {
//   const navigate = useNavigate();
//   const [subjects, setSubjects] = useState([]);
//   // const [subjects,Setsubjects]=useState([]);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     Object.assign(data, { role: "Teacher" });
//     console.log(data);

//     Axios.post("http://localhost:3001/register", { userdata: data }).then(
//       (response) => {
//         console.log(response.data.message);
//         if (response.data.message[0] == 0) {

//           cogoToast.error("Username already in use");

//         }
//         else if(response.data.message[1] == 0)
//         {
//           cogoToast.error("Please select atleast one course");
//         }

//         else if(response.data.message[0]==1 && response.data.message[1]==1) {
//           // navigate("/login");
//           cogoToast.success("Sucessuly added Teacher ");

//           reset({
//             firstname: "",
//             lastname: "",
//             email: "",
//             password: "",
//             confirmPassword: "",
//             phonenumber: "",
//             username: "",
//           });

//           // console.log(response.data);
//         }
//       }
//     );
//   };
//   console.log(errors);
//   useEffect(() => {
//     Axios.post("http://localhost:3001/getcourses").then((response) => {
//       // console.log(response.data.mysubjects);
//       setSubjects(response.data.mysubjects);
//     });
//   }, []);
//   const DrawerHeader = styled("div")(({ theme }) => ({
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//   }));

//   return (
//     <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//       <DrawerHeader />

//       <Box>
//         <h4>Add Teacher</h4>
//         <br />
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <TextField
//             id="outlined-basic"
//             label="First Name"
//             variant="outlined"
//             {...register("firstname",{ required: true })}
//           />
//           <br />
//           <br />

//           <TextField
//             id="outlined-basic"
//             label="Last Name"
//             variant="outlined"
//             {...register("lastname",{ required: true })}
//           />
//           <br />
//           <br />
//           <TextField
//             id="outlined-basic"
//             label="Username"
//             variant="outlined"
//             {...register("username",{ required: true })}
//           />
//           <br />
//           <br />
//           <TextField
//             id="outlined-basic"
//             label="Email"
//             variant="outlined"
//             {...register("email",{ required: true })}
//           />
//           <br />
//           <br />

//           <TextField
//             id="outlined-basic"
//             label="Phone Number"
//             variant="outlined"
//             {...register("phonenumber",{ required: true })}
//           />
//           <br />
//           <br />

//           <TextField
//             id="outlined-basic"
//             label="Password"
//             variant="outlined"
//             {...register("password",{ required: true })}
//           />
//           <br />
//           <br />
//           <TextField
//             id="outlined-basic"
//             label=" Confirm Password"
//             variant="outlined"
//             {...register("confirmPassword",{ required: true })}
//           />
//           <br />
//           <br />
//           <Box>
//             <h4>Assign Courses to teacher </h4>
//             {subjects.map((values) => (
//               <>
//                 <FormControlLabel
//                   control={<Checkbox {...register(values.Coursename, { required:false})} />}
//                   label={values.Coursename}
//                 />
//                 <br />
//               </>
//             ))}
//           </Box>
//           <Button variant="contained" type="submit">
//             Add Teacher
//           </Button>
//         </form>
//       </Box>
//     </Box>
//   );
// };
// export default AddTeacher;

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

const AddTeacher = (props) => {
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
  const [cr, setCr] = React.useState("");
  const [getCourses, setCourses] = useState([]); //for checkbox

  const loggedInUser = localStorage.getItem("user");
  const foundUser = JSON.parse(loggedInUser);

  const handleChange = (event) => {
    setCr(event.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    Axios.post("http://localhost:3001/addteacher", { t: data }).then(
      (response) => {
        console.log(response.data.e);
        if (response.data.e == 0) {
          cogoToast.error("Email in use");
        } else if (response.data.e == 1) {
          cogoToast.success("Teacher Added successfully");
          navigate("/admin/teacher");
        }
      }
    );
  };

  useEffect(() => {
    if (loggedInUser) {
      navigate("/admin/teacher/add");
    } else {
      navigate("/login");
    }
    Axios.post("http://localhost:3001/selectcourse").then((response) => {
      console.log(response.data);
      setCourse(response.data);
      console.log(response.data[0].course_name);
    });

    // Axios.post("http://localhost:3001/selectcourse").then((response) => {
    //   console.log(response.data);
    //   setCourses(response.data);
    //   console.log(response.data[0].course_name);
    // });
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />

      <Box>
        <h3>Add Teacher</h3>
        <div>
          &nbsp;
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="outlined-basic"
              label="Teacher Name"
              variant="outlined"
              {...register("teacher_name")}
            />
            &nbsp; &nbsp;
            <TextField
              id="outlined-basic"
              label="Teacher Email"
              variant="outlined"
              {...register("teacher_email")}
            />
            &nbsp; &nbsp;
            <TextField
              id="outlined-basic"
              label="Teacher Password"
              variant="outlined"
              {...register("teacher_password")}
            />
            <br />
            &nbsp; &nbsp;
            {/* <Box sx={{ minWidth: 220 }}>
              <FormControl sx={{ minWidth: 220 }}>
                <InputLabel id="demo-simple-select-label">Course</InputLabel>
                <Select
                  {...register("course_name")}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cr}
                  label="Course"
                  onChange={handleChange}
                >
                  {getCourse.map((c, i) => {
                    return (
                      <MenuItem value={c.course_name}>{c.course_name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box> */}
            <br />
            <br />
            {/* <Box sx={{ minWidth: 220 }}>
              <FormGroup>
                {getCourses.map((e, i) => {
                  return (
                    <FormControlLabel
                   
                      control={<Checkbox {...register('values', { required:false})} />}
                      label={e.course_name}
                      value={e.course_name}
                    />
                  );
                })}
              </FormGroup>
            </Box> */}
            <br />
            <Button variant="contained" type="submit">
              Add Teacher
            </Button>
          </form>
        </div>
      </Box>
    </Box>
  );
};
export default AddTeacher;
