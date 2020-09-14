import React from "react";

import axios from "axios";

import { Modal, Button, Form } from "react-bootstrap";

class AddTicket extends React.Component {
  state = {
    show: false,
    ticketName: "",
    ticketDescription: "",
    projectId: this.props.projectId,
    tableId: this.props.tableId,
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

  handleSubmit = () => {
    axios
      .post("/api/tickets/new", {
        ticket: {
          ticketName: this.state.ticketName,
          ticketDescription: this.state.ticketDescription,
        },
        projectId: this.props.projectId,
        tableId: this.props.tableId,
      })
      .then(() => {
        this.handleShow();
        this.props.update();
      });
  };
  render() {
    const { show } = this.state;
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Launch demo modal
        </Button>

        <Modal show={show} onHide={this.handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>New Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="ticketName" onChange={this.handleChange}>
                <Form.Label>Ticket Name:</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group
                controlId="ticketDescription"
                onChange={this.handleChange}
              >
                <Form.Label>Ticket Description:</Form.Label>
                <Form.Control />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleShow}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Add Ticket
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AddTicket;
