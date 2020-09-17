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

import axios from "axios";

import React from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import Board from "../board/board";
import AddTable from "../board/helpers/addTable";
import BuildTeam from "../board/helpers/buildTeam";
import MemberList from "./memberList";

import styled from "styled-components";
import { Button } from "react-bootstrap";

const Container = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-template-rows: 100px auto 100px;
  // background-color: rgb(255,255,255,0.8)
  // background-image: url("https://www.freevector.com/uploads/vector/preview/30349/Abstract_background_vector_1.jpg")
  background-size: cover;
  background-repeat: norepeat;
`;

const BoardContainer = styled.div`
  grid-column-start: 2;
  grid-row-start: 2;
`;

const ProjectTitle = styled.div`
  grid-column-start: 2;
  grid-row-start: 1;
  text-align: center;
  padding: 30px;
`;

const TeamContainer = styled.div`
  grid-column-start: 2;
  grid-row-start: 3;
`;

class ProjectOverview extends React.Component {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    this.getProject();
  }

  getProject = () => {
    this.setState(
      {
        isLoaded: false,
      },
      () => {
        axios
          .get(`/api/projects/${this.props.match.params.id}`)
          .then(({ data }) => {
            this.props.setSelectedProject(data);
          })
          .then(() => {
            this.setState({
              isLoaded: true,
            });
          });
      }
    );
  };

  render() {
    if (this.state.isLoaded === false) {
      return "loading...";
    } else {
      const { selectedProject } = this.props;

      return (
        <Container>
          <ProjectTitle>
            <h2>{selectedProject.project_name}</h2>
          </ProjectTitle>
          <BoardContainer>
            <Board
              dashboard={selectedProject.dashboard}
              projectId={this.props.match.params.id}
              update={this.getProject}
              members={selectedProject.members}
            />
          </BoardContainer>
          <TeamContainer>
            <BuildTeam
              projectId={this.props.match.params.id}
              update={this.getProject}
            />

            <MemberList members={selectedProject.members} />
          </TeamContainer>
        </Container>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedProject: (data) =>
      dispatch({
        type: "selectedProject",
        selectedProject: data,
      }),
  };
};

const mapStateToProps = (state) => {
  return {
    selectedProject: state.selectedProject,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectOverview)
);
