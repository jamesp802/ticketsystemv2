import React from "react";

import { Form, Button } from "react-bootstrap";
import axios from "axios";

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
    if (isVisible === true) {
      return (
        <Form>
          <Form.Group controlId="formBasicTableName" onChange={this.handleChange}>
            <Form.Label>Table Name:</Form.Label>
            <Form.Control />
          </Form.Group>
          <Button onClick={this.handleSubmit}>Add</Button>
        </Form>
      );
    }

    return <Button onClick={this.handleVisibility}>New Table</Button>;
  }
}

export default AddTable;
