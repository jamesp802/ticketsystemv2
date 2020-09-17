import React from "react";

import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

import { getUserData } from "../../redux/actions/userActions";

import { connect } from "react-redux";

class AddProject extends React.Component {
  state = {
    isVisible: false,
    formBasicProjectName: "",
  };

  handleSubmit = () => {
    const { formBasicProjectName } = this.state;
    axios
      .post("/api/projects/new", {
        project_name: formBasicProjectName,
      })
      .then(() => {
        this.props.update();
        this.handleVisibility();
      });
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    });
  };

  handleVisibility = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  render() {
    const { isVisible } = this.state;
    return (
      <>
        <Button variant="secondary" onClick={this.handleVisibility}>
          New Project
        </Button>

        <Modal show={isVisible} onHide={this.handleVisibility}>
          <Modal.Header closeButton>
            <Modal.Title>New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                controlId="formBasicProjectName"
                onChange={this.handleChange}
              >
                <Form.Label>Table Name:</Form.Label>
                <Form.Control />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleVisibility}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Create Project
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: () => dispatch(getUserData()),
  };
};

export default connect(null, mapDispatchToProps)(AddProject);
