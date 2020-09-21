import axios from "axios";
import React from "react";

import { Modal, Button, Form, ListGroup } from "react-bootstrap";

class BuildTeam extends React.Component {
  state = {
    query: "",
    show: false,
    members: [],
    results: [],
  };

  handleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState(
      {
        [id]: value,
      },
      this.searchUser()
    );
  };

  searchUser = () => {
    axios
      .post("/api/teams/search", {
        query: this.state.query,
      })
      .then((result) => {
        this.setState({
          results: result.data,
        });
      });
  };

  handleAdd = (id) => {
    const { members } = this.state;
    members.push(id);
    this.setState({
      members: members,
    });
  };

  handleCreate = () => {
    axios
      .post("/api/teams/add", {
        members: this.state.members,
        projectId: this.props.projectId,
      })
      .then(() => {
        return axios.post("/api/tables/new", {
          tableName: "Claimed Tickets",
          projectId: this.props.projectId,
          forClaims: true,
        });
      })
      .then(() => {
        axios
          .post("/api/tables/new", {
            tableName: "Completed Tickets",
            projectId: this.props.projectId,
            forCompleted: true,
          })
          .then(() => {
            this.props.update();
          });
      });
  };

  render() {
    return (
      <>
        <Button variant="secondary" onClick={this.handleShow} block>
          Build Team
        </Button>

        <Modal show={this.state.show} onHide={this.handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Build Team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="query" onChange={this.handleChange}>
                <Form.Label>Search Users:</Form.Label>
                <Form.Control />
              </Form.Group>
            </Form>
            <SearchResults
              results={this.state.results}
              handleAdd={this.handleAdd}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleShow}>
              Close
            </Button>
            <Button variant="secondary" onClick={this.handleCreate}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const SearchResults = ({ results, handleAdd }) => (
  <div>
    <ListGroup>
      {results.map((user, index) => {
        return (
          <ListGroup.Item onClick={() => handleAdd(user)} key={index}>
            {user.username}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  </div>
);

export default BuildTeam;
