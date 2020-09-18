import React from "react";
import axios from "axios";

import styled from "styled-components";
import { Form, Button } from "react-bootstrap";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserData } from "../../redux/actions/userActions";

import fireIcon from "../../../images/icons/fireicon.png"

const Container = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-template-rows: 100px auto 100px;
`;

const FormContainer = styled.div`
  grid-column-start: 2;
  grid-row-start: 2;
  max-width: 500px;
  min-width: 400px;
  min-height: 500px;
  // max-height: 600px;
  display: block;
  margin: auto;
  background-color: white;
  padding: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

class UserSignUp extends React.Component {
  state = {
    redirectToReferrer: false,
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
    });
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

      axios.post("/user/signup", registration, config).then((response) => {
        this.props.login().then(() => {
          this.setState({
            redirectToReferrer: true,
          });
        });
      });
    }
  };

  render() {
    const { redirectToReferrer, errorMessage } = this.state;
    if (redirectToReferrer === true) {
      return <Redirect to="/dash" />;
    }

    return (
      <Container>
        <FormContainer>
          <img
            src={fireIcon}
            style={{ display: "block", margin: "auto", width: "75px" }}
          />
          <h1 style={{ textAlign: "center", padding: "10px" }}>
            Pyrotech.io Sign Up
          </h1>
          <Form>
            {errorMessage === "" ? null : (
              <ErrorMessage>Something went wrong!</ErrorMessage>
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
            <Button variant="success" onClick={this.handleSubmit} block>
              Sign Up
            </Button>
            <Button variant="secondary" href="/login" block>
              Log In
            </Button>
          </Form>
        </FormContainer>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (cb) => dispatch(getUserData(cb)),
  };
};

export default connect(null, mapDispatchToProps)(UserSignUp);
