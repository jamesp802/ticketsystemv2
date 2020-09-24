import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ListGroup, Button } from "react-bootstrap";

import styled from "styled-components";

const CommitContainer = styled.div`
  max-height: 200px;
  overflow-y: scroll;
`;

class CommitHistory extends React.Component {
  state = {
    isLoaded: false,
    commits: [],
    error: false,
  };

  componentDidMount() {
    this.getCommits();
  }

  getCommits = () => {
    return axios
      .post("/api/projects/repo/branch/commits", {
        // projectId: this.props.SelectedProject._id,
        branch: this.props.branch,
      })
      .then((response) => {
        console.log('**', response.data);
        this.setState({
          commits: response.data,
          isLoaded: true,
        });
      })
      .catch((e) => {
        console.log('error', e)
        this.setState({
          isLoaded: true,
          error: true,
        });
      });
  };

  render() {
    const { SelectedProject } = this.props;
    const { commits } = this.state;

    if (this.state.isLoaded === false) {
      return null;
    }

    if (this.state.error === true) {
      return (<p><b>This ticket is connected to a branch, but you do not have permissions to view on GitHub</b></p>)
    }
    return (
      <CommitContainer>
        <ListGroup>
          {commits.map((commit, i) => (
            <ListGroup.Item key={i}>
              <img
                src={commit.author.avatar_url}
                style={{ width: "35px", borderRadius: "50%", margin: "5px" }}
              />
              <a href={commit.html_url} target="_blank">
                {commit.commit.message}
              </a>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </CommitContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    SelectedProject: state.selectedProject,
  };
};

export default connect(mapStateToProps, null)(CommitHistory);
