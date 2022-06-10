import React, { useState, useEffect } from "react";
import Axios from "axios";
import cogoToast from "cogo-toast";
import "rsuite/dist/rsuite.min.css";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// import MaterialUI from "./MaterialUI";

const StudentDashboard = () => {
  const navigate = useNavigate();



  const[s,setS]=useState([]);
  const [c,setC]=useState([]);

  const loggedInUser = localStorage.getItem("user");
  const foundUser=JSON.parse(loggedInUser);
  
  

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );



  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  );





  useEffect(() => {


    if(loggedInUser)
    {
     navigate('/student/dashboard')
      
     Axios.post("http://localhost:3001/getstudent",{email:foundUser.f}).then((response) => {
     
  


      setS(response.data.r[0])
      setC(response.data.co)
      console.log(response.data.co)
   
   });
    }
    else 
    {
      navigate('/login')
    }

  

  }, []);
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            <React.Fragment>
              <Grid item xs={4}>
                <Box sx={{ minWidth: 275 }}>
                  <Card variant="outlined">
                    <React.Fragment>
                      <CardContent>
                        <Typography
                         
                          color="text.secondary"
                          gutterBottom
                          variant="h4"
                        >
                          Student ID
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                         {s.student_id}
                        </Typography>
                       
                      </CardContent>
                      <CardActions>
                        <Button size="small">More Info</Button>
                      </CardActions>
                    </React.Fragment>
                  </Card>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box sx={{ minWidth: 275 }}>
                  <Card variant="outlined">
                    <React.Fragment>
                      <CardContent>
                        <Typography
                         
                          color="text.secondary"
                          gutterBottom
                          variant="h4"
                        >
                         Student Name
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                         {s.student_name}
                        </Typography>
                       
                      </CardContent>
                      <CardActions>
                        <Button size="small">More Info</Button>
                      </CardActions>
                    </React.Fragment>
                  </Card>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box sx={{ minWidth: 275 }}>
                  <Card variant="outlined">
                    <React.Fragment>
                      <CardContent>
                        <Typography
                         
                          color="text.secondary"
                          gutterBottom
                          variant="h4"
                        >
                        Student Email
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                         {s.student_email}
                        </Typography>
                       
                      </CardContent>
                      <CardActions>
                        <Button size="small">More Info</Button>
                      </CardActions>
                    </React.Fragment>
                  </Card>
                </Box>
              </Grid>
            </React.Fragment>
          </Grid>

          <Grid container item spacing={3}>
          <React.Fragment>
          <Grid item xs={4}>
                <Box sx={{ minWidth: 275 }}>
                  <Card variant="outlined">
                    <React.Fragment>
                      <CardContent>
                        <Typography
                         
                          color="text.secondary"
                          gutterBottom
                          variant="h4"
                        >
                       Class
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                         {s.class_name}
                        </Typography>
                       
                      </CardContent>
                      <CardActions>
                        <Button size="small">More Info</Button>
                      </CardActions>
                    </React.Fragment>
                  </Card>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box sx={{ minWidth: 275 }}>
                  <Card variant="outlined">
                    <React.Fragment>
                      <CardContent>
                        <Typography
                         
                          color="text.secondary"
                          gutterBottom
                          variant="h4"
                        >
                        Department
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                         {s.department_name}
                        </Typography>
                       
                      </CardContent>
                      <CardActions>
                        <Button size="small">More Info</Button>
                      </CardActions>
                    </React.Fragment>
                  </Card>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ minWidth: 275 }}>
                  <Card variant="outlined">
                    <React.Fragment>
                      <CardContent>
                        <Typography
                         
                          color="text.secondary"
                          gutterBottom
                          variant="h4"
                        >
                     My Courses
                        </Typography>
                      
                      
                       {

                         c.map((e)=>{
                           return(

                            <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">

                            {e.course_name}
  </Typography>
                           )
          
                         })
                       }
                      
                       
                      </CardContent>
                      <CardActions>
                        <Button size="small">More Info</Button>
                      </CardActions>
                    </React.Fragment>
                  </Card>
                </Box>
              </Grid>

             


              
            </React.Fragment>


            
          </Grid>



          
        </Grid>
        
      </Box>
      
    </Box>
  );
};
export default StudentDashboard;
