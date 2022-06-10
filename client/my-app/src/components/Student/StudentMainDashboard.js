import React, { useState, useEffect } from "react";
import Axios from "axios";
import cogoToast from "cogo-toast";
import "rsuite/dist/rsuite.min.css";
import StudentNavigationBar from "../Student/StudentNavigationBar";

import { useNavigate, useLocation } from "react-router-dom";
import "../../css/Dashboard.css";

// import MaterialUI from "./MaterialUI";
const StudentMainDashboard = (props) => {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
    cogoToast.info("Logged Out");
    localStorage.removeItem("user");

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
    // Axios.post("http://localhost:3001/getteacher",{g:location.state.email}).then((response) => {
    // });
  }, []);
  return (
    <div>
      <StudentNavigationBar logout={logout} r={1} comp={props.p} />
    </div>
  );
};
export default StudentMainDashboard;
