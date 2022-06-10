import "../css/Form.css";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import React, { useState } from "react";
import { Container, Navbar } from "react-bootstrap";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Online Examination System</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

function MyForm(props) {
  const [R, SetR] = useState(0);
  var l;
  var b;

  const clickedRegister = () => {
    SetR(0);
  };
  const clickedLogin = () => {
    SetR(1);
  };

  if (props.d == 1) {
    l = <RegisterForm />;
    b = (
      <p>
        Dont have an account?
        {/* <a onClick={clickedRegister}>Login</a> */}
        <Link to="/login">Login</Link>
      </p>
    );
  } else if (props.d == 0) {
    l = <LoginForm p={props.fun} />;
    b = (
      <p>
        Dont have an account?
        {/* <a onClick={clickedLogin}>Register</a> */}
        <Link to="/register">Register</Link>
      </p>
    );
  }

  return (
    <>
      {l}

      <Container>{b}</Container>
    </>
  );
}

function Home(props) {
  return (
    <>
      <NavigationBar />
      <MyForm d={props.r} fun={props.fun} />
    </>
  );
}

export default Home;
