import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Alert, Form, Row, Col, InputGroup } from "react-bootstrap";
function FormExample() {
    const [validated, setValidated] = useState(false);
  
  
  
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };
  
    return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-2">
          <Form.Group as={Col} md="2" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                Please choose a First Name.
              </Form.Control.Feedback>
              
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="2" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
                Please choose a Last Name.
              </Form.Control.Feedback>
          </Form.Group>
        </Row>
  
        <Row>
          <Form.Group as={Col} md="2" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="2" controlId="validationCustom01">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
               Enter valid 
              </Form.Control.Feedback>
              
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="2" controlId="validationCustom01">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              defaultValue=""
            />
            {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          </Form.Group>
        </Row>
  
        <Row>
          <Form.Group as={Col} md="2" controlId="validationCustomUsername">
            <Button type="submit">Submit form</Button>
          </Form.Group>
        </Row>
      </Form>
    );
  }
  export default  FormExample;