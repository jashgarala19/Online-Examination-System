import React, { useState, useEffect } from "react";
import Axios from "axios";
import cogoToast from "cogo-toast";
import "rsuite/dist/rsuite.min.css";
import { useNavigate ,useLocation} from "react-router-dom";
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

const AdminDashboard = () => {
  const navigate = useNavigate();

 const location = useLocation();

  const [department,setDepartment]=useState(0);
  const [classes,setClasses]=useState(0);
  const [course,setCourse]=useState(0);
  const [teacher,setTeacher]=useState(0);
  const [student,setStudent]=useState(0);

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
     navigate('/admin/dashboard')
      
      
    }
    else 
    {
      navigate('/login')
    }
    
    Axios.post("http://localhost:3001/getall").then((response) => {
  
     
      setDepartment(response.data.dep[0].total);
      setClasses(response.data.class[0].total);
      setCourse(response.data.course[0].total);
      setTeacher(response.data.teach[0].total);
      setStudent(response.data.student[0].total);
    
    });

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
                          Department
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                         {department}
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
                         Class
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                         {classes}
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
                        Courses
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                         {course}
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
                       Teacher
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                         {teacher}
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
                          Student 
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                         {student}
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
                       Users
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                         {teacher+student}
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
                        Results Generated 
                        </Typography>
                      
                        <Typography sx={{ mb: 1.5 }} color="black"   variant="h4">
                         4
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
export default AdminDashboard;
