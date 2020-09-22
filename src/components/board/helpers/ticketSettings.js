import React from "react";

import axios from "axios";

import { Modal, Button, Form } from "react-bootstrap";

import styled from "styled-components";
import { MemberList } from "./addTicket";

const AddSVG = styled.span`
  position: absolute;
  top: 0px;
  right: 0px;
  &:hover {
    cursor: pointer;
  }
`;

class TicketSettings extends React.Component {
  state = {
    ticketName: this.props.ticket.ticket_name,
    ticketDescription: this.props.ticket.ticket_description,
    label: this.props.ticket.label,
    assignedTo: this.props.ticket.assignedTo,
    projectId: this.props.projectId,
    tableId: this.props.tableId,
    isEditing: false,
  };

  handleShow = () => {
    this.props.handleShow();
  };

  handleAssign = (e) => {
    //FIXME: double check this
    let assigned = Array.from(e.target.selectedOptions, (item) =>
      item.value.split("::")
    );

    // split to touples, handle in server

    this.setState({
      assignedTo: assigned,
    });
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    });
  };

  handleSubmit = () => {
    // axios
    //   .post("/api/tickets/new", {
    //     ticket: {
    //       ticketName: this.state.ticketName,
    //       ticketDescription: this.state.ticketDescription,
    //     },
    //     projectId: this.props.projectId,
    //     tableId: this.props.tableId,
    //   })
    //   .then(() => {
    //     this.handleShow();
    //     // this.props.update();
    //   });
  };

  toggleEdit = () => {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  };

  deleteTicket = () => {
    const { projectId, tableId } = this.props;
    const ticketId = this.props.ticket._id;
    axios
      .delete(`/api/tickets/${projectId}/${tableId}/${ticketId}`)
      .then(() => {
        this.props.update();
      });
  };

  saveEdits = () => {
    const { projectId } = this.props;
    const ticketId = this.props.ticket._id;
    const { ticketName, ticketDescription, label, assignedTo } = this.state;
    axios
      .put(`/api/tickets/edit/${projectId}/ticket/${ticketId}`, {
        ticketName,
        ticketDescription,
        label,
        assignedTo,
      })
      .then(() => {
        this.props.update();
      });
  };

  render() {
    const { show, handleShow, ticket, noEdit } = this.props;

    if (show === false) {
      return null;
    } else {
      return (
        <>
          <Modal show={show} onHide={handleShow}>
            <Modal.Header closeButton>
              <Modal.Title>{ticket.ticket_name}</Modal.Title>
              {noEdit === true ? null : (
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  className="bi bi-pencil-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginLeft: "10px", marginTop: "10px" }}
                  onClick={this.toggleEdit}
                >
                  <path
                    fillRule="evenodd"
                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                  />
                </svg>
              )}
            </Modal.Header>
            <Modal.Body>
              {this.state.isEditing ? (
                <>
                  <Form>
                    <Form.Group
                      controlId="ticketName"
                      onChange={this.handleChange}
                    >
                      <Form.Label>Ticket Name:</Form.Label>
                      <Form.Control defaultValue={ticket.ticket_name} />
                    </Form.Group>
                    <Form.Group
                      controlId="ticketDescription"
                      onChange={this.handleChange}
                    >
                      <Form.Label>Ticket Description:</Form.Label>
                      <Form.Control defaultValue={ticket.ticket_description} />
                    </Form.Group>
                    <Form.Group
                      controlId="assignLabel"
                      onChange={this.handleLabel}
                    >
                      <Form.Label>Label:</Form.Label>
                      <Form.Control as="select">
                        <option>Research</option>
                        <option>Implementation</option>
                        <option>Review</option>
                        <option>Test</option>
                      </Form.Control>
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
                  <Button variant="danger" onClick={this.deleteTicket}>
                    DELETE TICKET
                  </Button>
                </>
              ) : (
                <ul>
                  <li>
                    <b>Description:</b>
                  </li>
                  {ticket.ticket_description}
                  <li>
                    <b>Label:</b>
                  </li>
                  {ticket.label}
                  <li>
                    <b>Created by:</b>
                  </li>
                  {ticket.createdBy.username}

                  {ticket.assignedTo.length === 0 ? null : (
                    <li>
                      <b>Assigned to:</b>
                    </li>
                  )}
                  {ticket.assignedTo.map((user) => {
                    return <li>{user[0]}</li>;
                  })}
                  <li>
                    {/* <b>Project Link:</b> */}
                    <a href={`/dash/project/${this.props.ticket.project_id}`}>Project Link</a>
                  </li>
                </ul>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleShow}>
                Close
              </Button>
              {this.state.isEditing ? (
                <Button variant="primary" onClick={this.saveEdits}>
                  Save
                </Button>
              ) : null}
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }
}

export default TicketSettings;
