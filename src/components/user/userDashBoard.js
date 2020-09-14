/**
 * My Projects List
 * My Teams List
 * My Personal Board List
 *
 * ASSIGNED, INPROGRESS, COMPLETE BIN
 **/

import React from "react";
import styled from "styled-components";
import { userData, projectData } from "../../initialData";

import { connect } from "react-redux";
// import { getProject } from "../../redux/actions/projectActions";

import GitHub from "../auth/gitSignIn";

import Board from "../board/board";
import ProjectList from "./projectList";

const Container = styled.div`
  display: grid;
  grid-template-columns: 200px auto 50px;
  grid-template-rows: 50px 50px auto;
`;

const DashBoardContainer = styled.div`
  display: flex;
  justify-content: center;
  grid-column-start: 2;
  grid-row-start: 3;
`;

const Title = styled.div`
  text-align: center;
  grid-column-start: 2;
  grid-row-start: 2;
`;

const ProjectListContainer = styled.div`
  text-align: center;
  grid-column-start: 1;
`;

class UserDashBoard extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <Container>
        <Title>Hello, {user.username}</Title>
        <ProjectList />
        <DashBoardContainer>
          <Board dashboard={projectData.dashboard} />
        </DashBoardContainer>
        <GitHub />
      </Container>
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
    // getProject: (projectId) => getProject(projectId),
  };
};

export default connect(mapStateToProps, null)(UserDashBoard);
