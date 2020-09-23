import React from "react";

import { Button, Form, Modal } from "react-bootstrap";

import axios from "axios";

class ConnectRepo extends React.Component {
  state = {
    repo: "",
    show: false,
  };

  handleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    });
  };

  handleConnect = () => {
    axios
      .post("/api/projects/repo/connect", { repo: this.state.repo })
      .then((data) => {
        console.log(data);
      });
  };

  render() {
    const { show } = this.state;
    return (
      <>
        <Button onClick={this.handleShow}>Connect Repo</Button>
        <Modal show={show} onHide={this.handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Connect Repo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="repo" onChange={this.handleChange}>
                <Form.Label>GitHub Url:</Form.Label>
                <Form.Control placeholder="www.github.com/" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleShow}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleConnect}>
              Connect
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ConnectRepo;
