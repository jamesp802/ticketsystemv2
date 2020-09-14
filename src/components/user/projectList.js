import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setSelectedProject } from "../../redux/actions/projectActions";

class ProjectList extends React.Component {
  render() {
    const { projects } = this.props.user;

    return (
      <ul>
        {projects.map((project) => (
          <Link
            key={project.project_id}
            to={`/dash/project/${project.project_id}`}
          >
            {project.project_name}
          </Link>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};


export default connect(mapStateToProps, null)(ProjectList);
