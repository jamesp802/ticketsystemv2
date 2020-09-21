import React from "react";

import axios from "axios";

import { Modal, Button, Form } from "react-bootstrap";

import styled from "styled-components";

const AddSVG = styled.span`
  position: absolute;
  top: 0px;
  right: 0px;
  &:hover {
    cursor: pointer;
  }
`;

class AddTicket extends React.Component {
  state = {
    show: false,
    ticketName: "",
    ticketDescription: "",
    assignedTo: [],
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

  handleAssign = (e) => {
    let assigned = Array.from(
      event.target.selectedOptions,
      (item) => item.value.split('::')
    )

    // split to touples, handle in server

    this.setState(
      {
        assignedTo: assigned,
      },
      () => console.log(this.state.assignedTo)
    );
  };

  handleSubmit = () => {
    axios
      .post("/api/tickets/new", {
        ticket: {
          ticketName: this.state.ticketName,
          ticketDescription: this.state.ticketDescription,
          assignedTo: this.state.assignedTo,
          projectId: this.props.projectId,
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
        <AddSVG>
          <svg
            width="3em"
            height="3em"
            viewBox="0 0 16 16"
            className="bi bi-plus"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            onClick={this.handleShow}
          >
            <path
              fillRule="evenodd"
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
        </AddSVG>

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
              <Form.Group
                controlId="assignMemberSelect"
                onChange={this.handleAssign}
              >
                <Form.Label>Assign To:</Form.Label>
                <Form.Control as="select" multiple>
                  <MemberList members={this.props.members} />
                </Form.Control>
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

const MemberList = ({ members }) => {
  let users = [];
  for (let id in members) {
    users.push(members[id]);
  }

  return users.map((user, index) => {
    return (
      <option key={index} value={`${user.username}::${user._id}`}>
        {user.username}
      </option>
    );
  });
};

export default AddTicket;
