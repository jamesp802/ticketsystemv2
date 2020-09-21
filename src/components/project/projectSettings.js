import React from "react";

import axios from "axios";

import { Modal, Button, Form } from "react-bootstrap";

import styled from "styled-components";

import { Redirect } from "react-router-dom";

//FIXME: update and redirect to dashbaord

const AddSVG = styled.span`
  position: absolute;
  top: 0px;
  right: 0px;
  &:hover {
    cursor: pointer;
  }
`;

class ProjectSettings extends React.Component {
  state = {
    show: false,
    deleted: false,
  };

  showProjectSettings = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  deleteProject = () => {
    const { project } = this.props;
    axios
      .delete(`/api/projects/${project._id}/`)
      .then(() => {
        this.setState({
          show: false,
          deleted: true,
        });
      })
  };

  render() {
    const { show } = this.state;
    const { project } = this.props;
    if (this.state.deleted === true) {
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    } else if (show === false) {
      return (
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-gear-fill"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          onClick={this.showProjectSettings}
        >
          <path
            fillRule="evenodd"
            d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 0 0-5.86 2.929 2.929 0 0 0 0 5.858z"
          />
        </svg>
      );
    } else if (show === true) {
      return (
        <>
          <Modal show={show} onHide={this.showProjectSettings}>
            <Modal.Header closeButton>
              <Modal.Title>{project.project_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{/* FIXME:{project.project_description} */}</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.deleteProject}>
                DELETE
              </Button>
              <Button variant="secondary" onClick={this.showProjectSettings}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }
}

export default ProjectSettings;
