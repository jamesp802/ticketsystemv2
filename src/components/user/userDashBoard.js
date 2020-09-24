/**
 * My Projects List
 * My Teams List
 * My Personal Board List
 *
 * ASSIGNED, INPROGRESS, COMPLETE BIN
 **/

import React from "react";
import styled from "styled-components";
import axios from "axios";
// import { userData, projectData } from "../../initialData";

import { connect } from "react-redux";
import { getUserData } from "../../redux/actions/userActions";

import GitHub from "../auth/gitSignIn";

import fireicon from "../../../images/icons/fireicon.png";
import chart from "../../../images/icons/chart.png";
import chart2 from "../../../images/icons/chart2.png";

// import Board from "../board/board";
import Board from "./userTicketBoard/userTicketBoard";
import ProjectList from "./projectList";

const Container = styled.div`
  display: grid;
  grid-template-columns: 350px auto 50px;
  grid-template-rows: 10px auto auto 50px;
  padding: 20px;
`;

const DashBoardContainer = styled.div`
  display: flex;
  justify-content: center;
  grid-column-start: 2;
  grid-row-start: 2;
  grid-row-end: 4;
  padding: 8px;
  margin: 5px;
  min-height: 500px;
  background-image: url("https://media.giphy.com/media/l0HlTy9x8FZo0XO1i/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const UserContainer = styled.div`
  grid-column-start: 1;
  grid-row-start: 2;
  background-color: whitesmoke;
  border: 5px solid rgb(52 58 64);
  border-radius: 10px;
  padding: 8px;
  margin: 5px;
`;

const Profile = styled.div`
  text-align: center;
`;

const ProjectListContainer = styled.div`
  text-align: center;
  grid-row-start: 3;
  grid-row-end: 4;
  grid-column-start: 1;
  background-color: whitesmoke;
  border: 5px solid rgb(52 58 64);
  border-radius: 10px;
  padding: 8px;
  margin: 5px;
  min-height: 400px;
`;

class UserDashBoard extends React.Component {
  state = {
    isLoaded: false,
  }

  componentDidMount () {
    axios.get('/user/git')
    .then(() => {
      this.setState({
        isLoaded: true,
      })
    })
    .catch(() => {
      this.setState({
        isLoaded: true,
      })
    })
  }

  render() {
    const { user } = this.props;

    if (this.state.isLoaded === false) {
      return "loading..."
    }

    return (
      <Container>
        <UserContainer>
          <Profile>
            <img
              src={
                user.gitAccess === null
                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKCdkfRY6P9BDL8rex_-H0vu1vqTs0J7gQvyH3SNGTOQ&usqp=CAU&ec=45702844"
                  : user.git.avatar
              }
              style={{
                display: "block",
                margin: "auto",
                marginTop: "10px",
                border: "1px solid lightgray",
                borderRadius: "50%",
                width: "100px",
              }}
            />
            Hello, {user.username}
            <br />
            {user.gitAccess === null ? (
              <GitHub />
            ) : (
              <p>GitHub: {user.git.login}</p>
            )}
          </Profile>
        </UserContainer>
        <ProjectListContainer>
          <ProjectList />
        </ProjectListContainer>
        <DashBoardContainer>
          <Board dashboard={user.dashboard} />
        </DashBoardContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(UserDashBoard);
