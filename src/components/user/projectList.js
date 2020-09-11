import React from "react";

import { connect } from "react-redux";

import { getProject } from "../../redux/actions/projectActions";

class ProjectList extends React.Component {
  render() {
    const { projects } = this.props.user;
    return (
      <ul>
        {projects.map((project) => (
          <li
            key={project.project_id}
            onClick={() => this.props.getProject(project.project_id)}
          >
            {project.project_name}
          </li>
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

const mapDispatchToProps = (dispatch) => {
  return {
    getProject: (projectId) => getProject(projectId),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
