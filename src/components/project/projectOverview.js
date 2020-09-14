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

import styled from "styled-components";
import { Button } from "react-bootstrap";

const Container = styled.div`
  display: grid;
  grid-template-columns: 50px auto 200px;
  grid-template-rows: 100px auto 100px;
`;

const BoardContainer = styled.div`
  grid-column-start: 2;
`;

const AddTableContainer = styled.div`
  grid-column-start: 3;
`;

class ProjectOverview extends React.Component {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    this.getProject();
  }

  getProject = () => {
    this.setState({
      isLoaded: false,
    });
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
  };

  render() {
    if (this.state.isLoaded === false) {
      return "loading...";
    }
    const { selectedProject } = this.props;

    return (
      <Container>
        <BoardContainer>
          <Board dashboard={selectedProject.dashboard} projectId={this.props.match.params.id} update={this.getProject}/>
        </BoardContainer>
        <AddTableContainer>
          <AddTable
            update={this.getProject}
            projectId={this.props.match.params.id}
          />
        </AddTableContainer>
      </Container>
    );
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
