import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ListGroup, Button } from "react-bootstrap";

// import { setSelectedProject } from "../../../redux/actions/projectActions";

// import AddProject from "../project/addProject";

class ListBranches extends React.Component {
  state = {
    isLoaded: false,
    branches: [],
  }

  componentDidMount () {
    this.getBranches()
  }

  getBranches = () => {
    return axios.post('/api/projects/repo/branches', {
      projectId: this.props.SelectedProject._id,
    })
    .then((response) => {
      console.log(response.data)
      this.setState({
        branches: response.data,
        isLoaded: true,
      })
    })

  }

  selectBranch = (index) => {
    this.props.selectBranch(this.state.branches[index]);
  }

  render() {
    const { SelectedProject } = this.props;
    const {branches} = this.state;

    if (this.state.isLoaded === false) {
      return null
    }
    return (
      <>
        <b style={{ paddingBottom: "8px" }}>Connect Branch</b>
        <ListGroup>
          {branches.map((branch, i) => (
            <ListGroup.Item id="branch" key={i} onClick={() => this.selectBranch(i)}>
                {branch.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    SelectedProject: state.selectedProject,
  };
};

export default connect(mapStateToProps, null)(ListBranches);
