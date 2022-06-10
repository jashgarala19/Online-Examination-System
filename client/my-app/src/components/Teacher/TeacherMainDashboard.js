import React, { useState, useEffect } from "react";
import Axios from "axios";
import cogoToast from "cogo-toast";
import "rsuite/dist/rsuite.min.css";
import TeacherNavigationBar from "../Teacher/TeacherNavigationBar";

import { useNavigate,useLocation } from "react-router-dom";
import "../../css/Dashboard.css";

// import MaterialUI from "./MaterialUI";
const TeacherMainDashboard = (props) => {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();



  const logout = () => {

    navigate("/login");
    cogoToast.info("Logged Out");
    localStorage.clear();

    // console.log("hello")
  };

  // useEffect(() => {
  //   Axios.post("http://localhost:3001/checkloggedIn").then((response) => {
  //     if (response.data.loggedIn == true) {
  //       // console.log(response.data.user[0].Firstname);
  //       // console.log(response.data.user[0].Role);
  //       setData(response.data.user[0]);

    
  //       // console.log(data.Firstname);
  //     } else {
  //       navigate("/login");
  //     }
  //   });
  // }, []);


    useEffect(() => {

  
    
  }, []);
  return (
    <div>
      <TeacherNavigationBar logout={logout}   r={1}  comp={props.p}  />   

 


    </div>
  );
};
export default TeacherMainDashboard;
