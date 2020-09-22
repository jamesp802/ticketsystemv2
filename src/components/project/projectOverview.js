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
import ProjectSettings from "./projectSettings";

import styled from "styled-components";
import { Button } from "react-bootstrap";

const Container = styled.div`
  display: grid;
  grid-template-columns: 350px auto 50px;
  grid-template-rows: 50px 100px auto 100px;
`;

const BoardContainer = styled.div`
  // grid-column-start: 2;
  // grid-row-start: 2;
  display: flex;
  justify-content: center;
  grid-column-start: 2;
  grid-row-start: 2;
  grid-row-end: 4;
  // background-color: whitesmoke;
  // border: 5px solid rgb(52 58 64);
  // border-radius: 10px;
  // padding: 20px;
  margin: 5px;
  min-height: 500px;
  background-image: url("https://media.giphy.com/media/l0HlTy9x8FZo0XO1i/giphy.gif");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const ProjectTitle = styled.div`
  grid-column-start: 1;
  grid-row-start: 2;
  text-align: center;
  background-color: whitesmoke;
  border: 5px solid rgb(52 58 64);
  border-radius: 10px;
  padding: 8px;
  margin: 5px;
  display: flex;
  justify-content: center;
`;

const TeamContainer = styled.div`
  grid-column-start: 1;
  grid-row-start: 3;
  grid-row-end: 4;
  background-color: whitesmoke;
  border: 5px solid rgb(52 58 64);
  border-radius: 10px;
  padding: 8px;
  margin: 5px;
`;

class ProjectOverview extends React.Component {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    this.getProject();
    setInterval(() => {
      this.getProject();
    }, 60000);
  }

  getProject = () => {
    // this.setState(
    //   {
    //     isLoaded: false,
    //   },
    // () => {
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
    // }
    // );
  };

  render() {
    if (this.state.isLoaded === false) {
      return "loading...";
    } else {
      const { selectedProject } = this.props;

      return (
        <Container>
          <ProjectTitle>
            <h2 style={{ padding: "8px" }}>{selectedProject.project_name}</h2>
            {/* <ProjectSettings project={selectedProject} update={this.getProject}/> */}
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
            <h2 style={{ textAlign: "center" }}>Members</h2>
            <MemberList members={selectedProject.members} />
            <BuildTeam
              projectId={this.props.match.params.id}
              update={this.getProject}
              members={selectedProject.members}
            />
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
