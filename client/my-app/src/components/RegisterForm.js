import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { REQUIRED_VALIDATION } from "../utils/utils";
import { useNavigate } from "react-router-dom";
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
import Axios from "axios";
import "../css/Form.css";
import cogoToast from "cogo-toast";
const RegisterForm = () => {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const initState = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phonenumber: "",
    role: "",
  };
  const [initialValues, setInitialValues] = useState(initState);

  const validationSchema = yup
    .object({
      firstname: yup
        .string()
        .max(20, "Max 20 Length")
        .required(REQUIRED_VALIDATION("Firstname"))
        .matches(/^[aA-zZ\s]+$/, "Please enter valid name"),
      lastname: yup
        .string()
        .max(20, "Max 20 Length")
        .required(REQUIRED_VALIDATION("Lastname"))
        .matches(/^[aA-zZ\s]+$/, "Please enter valid name"),
      username: yup
        .string()
        .required(REQUIRED_VALIDATION("Username"))
        .max(30, "Max 30 Length")
        .min(4, "Min 4 Length")

        .matches(
          /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
          "Please enter valid username "
        ),
      email: yup.string().email().required(REQUIRED_VALIDATION("Email")),
      password: yup.string().min(6).required(REQUIRED_VALIDATION("password")),
      confirmPassword: yup
        .string()
        .when("password", (password, field) =>
          password
            ? field
                .required(REQUIRED_VALIDATION("Confirm Password"))
                .oneOf([yup.ref("password")])
            : field
        ),
      phonenumber: yup
        .string()
        .required(REQUIRED_VALIDATION("Phone no"))
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is invalid"
        )
        .min(10, "to short")
        .max(10, "to long"),

      role: yup.string().required(REQUIRED_VALIDATION("Role")),
      // termsAndConditions: yup.boolean().oneOf([true], "Must be Checked!"),
    })
    .required();

  const onSubmit = (values) => {
    console.log("Values:::", values);

    Axios.post("http://localhost:3001/register", { userdata: values }).then(
      (response) => {
        if (response.data.message == 0) {
          console.log(response.data);
          cogoToast.error("Username already in use");
        } else {
          navigate("/login");
          cogoToast.success("Success");
          console.log(response.data);
        }
      }
    );

    // validateusername(values);
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

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
  useEffect(() => {
    Axios.post("http://localhost:3001/checkloggedIn").then((response) => {
      console.log(response.data);
      if (response.data.loggedIn == true) {
        if(response.data.user[0].Role="Student")
        {
          navigate("/student");

        }
        else if(response.data.user[0].Role="Teacher")
        {
          navigate("/teacher");
        }

      }
    });
  }, []);
  return (
    <>
      <div>
        <Container className="RegisterForm">
          <h2> Register </h2>
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group
              className="mb-3"
              as={Col}
              md="4"
              controlId="formBasicFirstName"
            >
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                {...register("firstname")}
              />
              {errors.firstname && (
                <Form.Text className="text-danger">
                  {errors.firstname.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Col}
              md="4"
              controlId="formBasicLastName"
            >
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                {...register("lastname")}
              />
              {errors.lastname && (
                <Form.Text className="text-danger">
                  {errors.lastname.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Col}
              md="4"
              controlId="validationCustomUsername"
            >
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  {...register("username")}
                />
              </InputGroup>
              {errors.username && (
                <Form.Text className="text-danger">
                  {errors.username.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Col}
              md="4"
              controlId="formBasicEmail"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register("email")}
              />
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
              controlId="formBasicPhone"
            >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                {...register("phonenumber")}
              />
              {errors.phonenumber && (
                <Form.Text className="text-danger">
                  {errors.phonenumber.message}
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

            <Form.Group
              className="mb-3"
              as={Col}
              md="4"
              controlId="formBasicPassword2"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <Form.Text className="text-danger">
                  {/* {errors.confirmPassword.message} */}
                  {"confirm password not matching with password"}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Col}
              md="4"
              controlId="formBasicSelect"
            >
              <Form.Label>Select Role</Form.Label>

              <Form.Select
                aria-label="Default select example"
                {...register("role")}
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </Form.Select>
              {errors.role && (
                <Form.Text className="text-danger">
                  {errors.role.message}
                </Form.Text>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};
export default RegisterForm;

