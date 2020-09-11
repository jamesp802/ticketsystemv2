/**
 * LIST:
 * - Overview (default)
 * - Teams
 *
 * OVERVIEW
 * Project Tables
 * Make ticket ->
 * Assign Team/Member
 *  -> add to team bin
 *
 * TEAMS
 * snapshot their board on click, view full board -> bring to team board
 *
 */

import React from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-template-rows: 100px auto 100px;
`;

const ProjectListContainer = styled.div`
  grid-column-start: 1;
`;

class ProjectOverview extends React.Component {

  handleSelectProject = () => {

  }


  render() {
    const { projects } = this.props.user; // project list array

    return (
      <Container>
        <ProjectListContainer>
          <ListGroup as="ul">
            {projects.map((project) => {
              return (
                <ListGroup.Item as="li" key={project.project_id}>
                  {project.name}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </ProjectListContainer>
      </Container>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getUserProjects: () => dispatch(getUserProjects()),
//   };
// };

const mapStateToProps = (state) => {
  return {
    userProjects: state.user.projects,
  };
};

export default connect(mapStateToProps, null)(ProjectOverview);
