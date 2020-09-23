import React from "react";

import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

import styled from "styled-components";

const AddTableSVGContainer = styled.div`
  margin: auto;
  &:hover {
    cursor: pointer;
  }
`;

class AddTable extends React.Component {
  state = {
    isVisible: false,
    formBasicTableName: "",
  };

  handleSubmit = () => {
    const { formBasicTableName } = this.state;
    axios
      .post("/api/tables/new", {
        tableName: formBasicTableName,
        projectId: this.props.projectId,
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
      <AddTableSVGContainer>
        <svg
          width="5em"
          height="5em"
          viewBox="0 0 16 16"
          className="bi bi-file-plus-fill"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          onClick={this.handleVisibility}
        >
          <path
            fillRule="evenodd"
            d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"
          />
        </svg>

        <Modal show={isVisible} onHide={this.handleVisibility}>
          <Modal.Header closeButton>
            <Modal.Title>New Table</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                controlId="formBasicTableName"
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
              Add Table
            </Button>
          </Modal.Footer>
        </Modal>
      </AddTableSVGContainer>
    );
  }
}

export default AddTable;
