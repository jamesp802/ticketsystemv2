import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ListGroup, Button } from "react-bootstrap";

import { setSelectedProject } from "../../redux/actions/projectActions";

import AddProject from "../project/addProject";

class ProjectList extends React.Component {
  render() {
    const { projects } = this.props.user;

    return (
      <>
        <h2 style={{paddingBottom: '8px'}}>My Projects</h2>
        <ListGroup>
          {projects.map((project) => (
            <ListGroup.Item key={project.project_id}>
              <Link
                key={project.project_id}
                to={`/dash/project/${project.project_id}`}
              >
                {project.project_name}
              </Link>
            </ListGroup.Item>
          ))}
          <br/>
          <AddProject />
        </ListGroup>
        <hr/>
        <h2 style={{paddingBottom: '8px'}}>Memberships</h2>
        <ListGroup>
          {projects.map((project) => (
            <ListGroup.Item key={project.project_id}>
              <Link
                key={project.project_id}
                to={`/dash/project/${project.project_id}`}
              >
                {project.project_name}
              </Link>
            </ListGroup.Item>
          ))}
          <br/>
        </ListGroup>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(ProjectList);
