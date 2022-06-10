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

const TeacherDashboard = () => {
  const navigate = useNavigate();


  const[t,setT]=useState([]);

  const[dep,setDep]=useState([]);

  const[c,setC]=useState([]);
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
     navigate('/teacher/dashboard')
      
      
    Axios.post("http://localhost:3001/getteacher",{email:foundUser.f}).then((response) => {
  

      console.log(response.data.res[0]);
      // console.log(response.data.dep)
      console.log(response.data.dep)
     
      setT(response.data.res[0])
      setDep(response.data.dep)
      setC(response.data.class)
      console.log(response.data.class)
      

      
    });
    }
    else 
    {
      navigate('/login')
    }
    console.log("hello")



    

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
                         Course Allocated
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                        {t.allcourses}
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
                         Teacher ID
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                         {t.teacher_id}
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
                        Teacher Name
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                         {t.teacher_name}
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
                      Teacher Email
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                         {t.teacher_email}
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
                        Departments Teaching
                        </Typography>
                      
                     
                
                         
                         
                            <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                 {dep.department_name}
                          
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
                       Class Teaching
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                        {
                         c.map((e,i)=>{
                         
                          return(
                            <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                 {e.class_name}
                          
                     </Typography>
                          )

                          

                         })
                    }
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



          
        </Grid>
        
      </Box>
      
    </Box>
  );
};
export default TeacherDashboard;
