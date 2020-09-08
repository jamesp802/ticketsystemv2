import React from "react";
import axios from "axios";

import styled from "styled-components";
import { Form, Button } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

const Container = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-template-rows: 100px auto 100px;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  grid-column-start: 2;
  grid-row-start: 2;
`;

const ErrorMessage = styled.span`
  color: red;
`;

class UserSignUp extends React.Component {
  state = {
    formBasicEmail: "",
    formBasicPassword: "",
    formBasicPasswordCheck: "",
    formBasicUsername: "",
    validPassword: true,
    errorMessage: "",
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    }, console.log(this.state));
  };

  handleSubmit = () => {
    const {
      formBasicEmail,
      formBasicPassword,
      formBasicPasswordCheck,
      formBasicUsername,
      validPassword,
      errorMessage,
    } = this.state;

    if (formBasicPassword !== formBasicPasswordCheck) {
      this.setState({
        validPassword: false,
        errorMessage: "Passwords Must Match",
      });
      return;
    } else if (validPassword === true) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const registration = {
        username: formBasicUsername,
        email: formBasicEmail,
        password: formBasicPassword,
      };

      axios
        .post("/user/signup", registration, config)
        .then((response) => {
          console.log(response.data.token);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <Container>
        <FormContainer>
          <Form>
            {errorMessage === "" ? null : (
              <ErrorMessage>{errorMessage}</ErrorMessage>
            )}
            <Form.Group
              controlId="formBasicUsername"
              onChange={this.handleChange}
            >
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="Enter a username" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" onChange={this.handleChange}>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group
              controlId="formBasicPassword"
              onChange={this.handleChange}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group
              controlId="formBasicPasswordCheck"
              onChange={this.handleChange}
            >
              <Form.Label>Re-Enter Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" onClick={this.handleSubmit}>
              Sign Up
            </Button>
          </Form>
        </FormContainer>
      </Container>
    );
  }
}

export default UserSignUp;
