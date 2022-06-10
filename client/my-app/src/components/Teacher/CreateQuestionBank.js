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
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

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

const CreateQuestionBank = (props) => {
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
  const [value, setValue] = React.useState(new Date());

  const [c, setC] = useState([]);
  const [a, setA] = useState("");

  const [test, setTest] = useState([]);
  const [count, setCount] = useState(1);

  const [answer, setAnswer] = React.useState();



  
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  let renderCount = 0;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      name: "Questions",
    });

  renderCount++;

  const onSubmit = (data) => {
    console.log(data)
    // console.log(renderCount)
    
  
    Axios.post("http://localhost:3001/insertquestions", { qns: data,t:foundUser.f,totalqns:fields.length}).then(
      (response) => {
        // console.log(response.data.res[0].course_name);
        // console.log(response.data.dep)

        
      }
    );

    navigate('/teacher/QuestionBank/')

  };
  const flexContainer = {
    display: "flex",
    flexDirection: "column",
    padding: 0,
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleChange2 = (event) => {
    setA(event.target.value);
  };

  const handleChange3 = (event) => {
    setAnswer(event.target.value);
  };

  useEffect(() => {
    if (loggedInUser) {
      navigate("/teacher/QuestionBank/add");
      console.log(foundUser)
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
  }, [watch]);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />

      <Box>
        <h3>Create Question Bank</h3>
        <div>
          &nbsp;
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="outlined-basic"
              label="Question Bank Name"
              variant="outlined"
              {...register("exam_name")}
            />
            <br />
            <br />

            <TextField
              id="outlined-basic"
              label="Marks per Question"
              variant="outlined"
              type="number"
              InputProps={{
                inputProps: {
                  min: 1,
                },
              }}
              {...register("marks_per_question")}
            />

            <br />
            <br />
        

      
            <Box style={flexContainer}>
              {fields.map((item, index) => {
                return (
                  <Box disablePadding key={item.id} style={flexContainer}>
                    <Box>
                    <TextField
                      label={"Question " + index}
                      id="outlined-basic"
                      multiline
                      fullWidth
                      rows={3}
                      variant="outlined"
                      {...register(`Questions.${index}.Question`)}
                    />
                    </Box>
                   

                    <br/>


                    <Controller
                      render={({ field }) => (
                        <Box>
                          <TextField
                            label={"Answer 1"}
                            id="outlined-basic"
                            multiline
                            fullWidth
                            rows={1}
                            variant="outlined"
                            {...field}
                            style={flexContainer}
                          />
                        </Box>
                      )}
                      name={`Questions.${index}.Answer1`}
                      control={control}
                    />
    <br/>
                    <Controller
                      render={({ field }) => (
                        <Box>
                          <TextField
                            label={"Answer 2"}
                            id="outlined-basic"
                            multiline
                            fullWidth
                            rows={1}
                            variant="outlined"
                            {...field}
                            style={flexContainer}
                          />
                        </Box>
                      )}
                      name={`Questions.${index}.Answer2`}
                      control={control}
                    />
    <br/>
                    <Controller
                      render={({ field }) => (
                        <Box>
                          <TextField
                            label={"Answer 3"}
                            id="outlined-basic"
                            multiline
                            fullWidth
                            rows={1}
                            variant="outlined"
                            {...field}
                            style={flexContainer}
                          />
                        </Box>
                      )}
                      name={`Questions.${index}.Answer3`}
                      control={control}
                    />
    <br/>
                    <Controller
                      render={({ field }) => (
                        <Box>
                          <TextField
                            label={"Answer 4"}
                            id="standard-textarea"
                            multiline
                            fullWidth
                            rows={1}
                            variant="outlined"
                            {...field}
                            style={flexContainer}
                          />
                        </Box>
                      )}
                      name={`Questions.${index}.Answer4`}
                      control={control}
                    />
                    <br />

                    <Controller
                      control={control}
                      name={`Questions.${index}.Answer`}
                      render={({ field: { onChange } }) => (
                        <Box
                          sx={{ px: 6 }}
                          key={item.id}
                          style={flexContainer}
                        >
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Answer
                            </InputLabel>

                            <Select
                              // {...register(`Questions.${index}.Answer`)}

                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={answer}
                              label="Answer"
                              onChange={onChange}
                              defaultValue=""
                            >
                              <MenuItem value={"a"}>Answer 1</MenuItem>
                              <MenuItem value={"b"}>Answer 2</MenuItem>
                              <MenuItem value={"c"}>Answer 3</MenuItem>
                              <MenuItem value={"d"}>Answer 4</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      )}
                    />

                    <ListItem />

                    <ListItem>
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={() => remove(index)}
                      >
                        Delete
                      </Button>
                      <br />
                      <br />
                    </ListItem>
                    <br />
                    <br />
                  </Box>
                );
              })}
            </Box>

            <Button
              variant="contained"
              type="button"
              onClick={() => {
                append();
              }}
            >
              Add Question
            </Button>
            <br />
            <br />
            <Button variant="contained" type="submit">
              Create Question Bank
            </Button>
          </form>
        </div>
      </Box>
    </Box>
  );
};
export default CreateQuestionBank;
