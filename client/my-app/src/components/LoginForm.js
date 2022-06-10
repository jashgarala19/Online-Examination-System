import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import cogoToast from "cogo-toast";
import { REQUIRED_VALIDATION } from "../utils/utils";
import {
  Form,
  Button,
  Container,
  Col,
  InputGroup,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const LoginFrom = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  Axios.defaults.withCredentials = true;
  const initState = {
    email: "",
    password: "",
  };
  const [initialValues, setInitialValues] = useState(initState);
  const validationSchema = yup
    .object({
      email: yup.string().required(REQUIRED_VALIDATION("Email")),
      password: yup.string().required(REQUIRED_VALIDATION("Password")),

      // termsAndConditions: yup.boolean().oneOf([true], "Must be Checked!"),
    })
    .required();
  const onSubmit = (values) => {
    console.log("Values:::", values);
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log("ok");

      console.log(response.data);

      if (response.data.e == "Correct") {
        setUser(response.data);
        cogoToast.success("Logged In successfully");
        localStorage.setItem("user", JSON.stringify(response.data));

        if (response.data.r == 1) {
          navigate("/admin/dashboard");
        } else if (response.data.r == 2) {
          navigate("/teacher/dashboard");
        } else if (response.data.r == 3) {
          navigate("/student/dashboard");
        }
      } else if (response.data.e == "Wrong username Password") {
        cogoToast.error("Wrong username Password");
      } else if (response.data.e == "Invalid") {
        cogoToast.error("Invalid Email and Password");
      }
    });
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      navigate("/teacher/dashboard");
    } else {
      navigate("/login");
    }
  }, []);
  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  // termsAndConditions: yup.boolean().oneOf([true], "Must be Checked!"),
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initialValues,

    resolver: yupResolver(validationSchema),
  });



  return (
    <>
      <Container className="RegisterForm">
        <h2>Login</h2>

        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Form.Group
            className="mb-3"
            as={Col}
            md="4"
            controlId="validationCustomUsername"
          >
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                {...register("email")}
              />
            </InputGroup>
            {errors.email && (
              <Form.Text className="text-danger">
                {errors.email.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group
            className="mb-3"
            as={Col}
            md="4"
            controlId="formBasicPassword"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <Form.Text className="text-danger">
                {errors.password.message}
              </Form.Text>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};
export default LoginFrom;
