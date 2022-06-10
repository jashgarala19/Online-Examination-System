import React, { useState, useEffect } from "react";
import Axios from "axios";
import cogoToast from "cogo-toast";
import "rsuite/dist/rsuite.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
// import MaterialUI from "./MaterialUI";
import "./inexam.css";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";


import { Form, Formik } from 'formik';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useTimer } from "react-timer-hook";
import Swal from 'sweetalert2'
function MyTimer({ expiryTimestamp }) {
    const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      resume,
      restart,
    } = useTimer({
      expiryTimestamp,
      onExpire: () => {
          
        window.location.replace("http://localhost:3000/student/Exam/")
     

      },
    });
  
    return (
      <div style={{ textAlign: "center" }}>
        
        <div style={{ fontSize: "70px" }}>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
          <span>{seconds}</span>
        </div>
        <p>{isRunning ? "Running" : "Not running"}</p>
    
      </div>
    );
  }


function InExam(props) {


    const navigate = useNavigate();
    const location = useLocation();

    const loggedInUser = localStorage.getItem("user");
    const foundUser = JSON.parse(loggedInUser);

    const getExamdetails = localStorage.getItem("examdetails");
    const foundExamdetails = JSON.parse(getExamdetails);

    const getquestions = localStorage.getItem("myquestions");
    const foundQuestions = JSON.parse(getquestions);


 
// time.setSeconds(time.getSeconds() + 5);

    const js = foundQuestions[0].questions;
    const js2 = JSON.parse(js);
    console.log(js2);
    const handleChange = (event) => {
        setValue(event.target.value);
      };
      let renderCount = 0;
      const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        formState: { errors },
      } = useForm();
  
      const [value, setValue] = React.useState('female');
      const { fields, append, prepend, remove, swap, move, insert, replace } =
        useFieldArray({
          control,
          name: "fieldArray",
        });
      renderCount++;

      const onSubmit = (values) => {    

        console.log(values);

        Axios.post("http://localhost:3001/result",{studentans:values,rightans:js2,markspq:foundQuestions[0].MarksPerQuestion,st_id:foundUser.f,exam_id:foundExamdetails[0].Exam_id,totalqns:foundQuestions[0].total_questions}).then(
            (response) => {
            
                navigate('/student/Exam/')
        
    
            }
          );
        

      }
      const time = new Date();
    useEffect(() => {

       
        time.setSeconds(time.getSeconds() + foundExamdetails[0].Exam_total_time*60);
        if (loggedInUser) {
            navigate("/student/Exam/InExam");
        } else {
            navigate("/login");
        }
    }, []);


    return (
        <div className="maincontainer">
               <div className="questions">
            <form  onSubmit={handleSubmit(onSubmit)}>
             
                    {js2.map((e, index) => {
                        return (
                            <div className="questioncontainer">
                                <h5>
                                    Question{index}:{e.Question}
                                </h5>
                                <Controller
                      control={control}
                      name={`fieldArray.${index}.Answer`}
                      defaultValue=""
                      render={({ field}) => (
                        <Box
                          sx={{ px: 6 }}
                          key={e.id}
              
                        >
                        
                        <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
      {...field}
      >
        <FormControlLabel value={"a"} control={<Radio />} label={e.Answer1} />
        <FormControlLabel value={"b"}control={<Radio />} label={e.Answer2} />
        <FormControlLabel value={"c"} control={<Radio />} label={e.Answer3} />
        <FormControlLabel value={"d"} control={<Radio />} label={e.Answer4} />
      
   
        
      </RadioGroup>
                        </Box>
                      )}
                    />


                            </div>
                        );
                    })}
                    <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
               
            

            </form>
            </div>
            <div className="details">
                <h3>Exam Name:{foundExamdetails[0].Exam_name}</h3>
                <h3>Total Time:{foundExamdetails[0].Exam_total_time} min</h3>
                    <MyTimer expiryTimestamp={time} />
            </div>
        </div>
    );
}
export default InExam;
