import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { FormGroup, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { getUserData } from "../../redux/actions/userActions";

import styled from "styled-components";

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
  max-height: 600px;
  display: block;
  margin: auto;
  background-color: white;
  padding: 20px;
`;

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    errorMessage: "",
    formBasicEmail: "",
    formBasicPassword: "",
  };

  login = () => {
    const { formBasicEmail, formBasicPassword } = this.state;

    axios
      .post("/user/login", {
        email: formBasicEmail,
        password: formBasicPassword,
      })
      .then((response) => {
        this.props
          .login()
          .then(() => {
            this.setState({
              redirectToReferrer: true,
            });
          })
          .catch((err) => {
            this.setState({
              errorMessage: `Failed to Login: ${err}`,
            });
          });
      })
      .catch((err) => {
        this.setState({
          errorMessage: `Failed to Login: ${err}`,
        });
      });
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    });
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/dash" },
    };
    //FIXME: error message
    const { redirectToReferrer, errorMessage } = this.state;
    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <Container>
        <FormContainer>
          <img
            src={fireIcon}
            style={{ display: "block", margin: "auto", width: "75px" }}
          />
          <h1 style={{ textAlign: "center", padding: "10px" }}>
            Pyrotech.io Login
          </h1>
          <Form>
            {errorMessage === "" ? null : <p>{errorMessage}</p>}
            <Form.Group controlId="formBasicEmail" onChange={this.handleChange}>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group
              controlId="formBasicPassword"
              onChange={this.handleChange}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
              <Button variant="success" onClick={this.login} block>
                Login
              </Button>
              <Button variant="secondary" href="/signup" block>
                Sign Up
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

export default connect(null, mapDispatchToProps)(Login);
