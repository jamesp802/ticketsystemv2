import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { FormGroup, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import Auth from "./helpers/isAuth";

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
        if (response.data.token) {
          this.props.login(response.data.token);
          this.setState(() => ({
            redirectToReferrer: true,
          }));
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: `Failed to Login: ${error}`,
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
    const { redirectToReferrer, errorMessage } = this.state;
    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div>
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
          <Button variant="primary" onClick={this.login}>
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (token) =>
      dispatch({
        type: "token",
        token: {
          token: token,
          isAuth: true,
        },
      }),
  };
};

export default connect(null, mapDispatchToProps)(Login);
