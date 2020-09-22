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

// const ContentContainer = styled.div`
//   background-color: rgb(255, 255, 255, 0.9);
//   margin: 20px;
//   padding: 20px;
// `;

const DashBoardContainer = styled.div`
  display: flex;
  justify-content: center;
  grid-column-start: 2;
  grid-row-start: 2;
  grid-row-end: 4;
  // background-color: whitesmoke;
  // border: 5px solid rgb(52 58 64);
  // border-radius: 10px;
  padding: 8px;
  margin: 5px;
  min-height: 500px;
  background-image: url("https://media.giphy.com/media/l0HlTy9x8FZo0XO1i/giphy.gif");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

`;

const UserContainer = styled.div`
  // text-align: center;
  grid-column-start: 1;
  grid-row-start: 2;
  background-color: whitesmoke;
  border: 5px solid rgb(52 58 64);
  border-radius: 10px;
  padding: 8px;
  margin: 5px;
`;

// const UserContentContainer = styled.div`
//   display: grid;
//   grid-template-columns: 200px auto 100px;
//   grid-template-rows: auto;
//   padding: 8px;
// `;

const Profile = styled.div`
  // grid-column-start: 1;
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
    git: null,
  };

  componentDidMount() {
    axios.get("/user").then((response) => {
      console.log(response.data);
      this.setState({
        git: response.data,
      });
    });
  }

  render() {
    const { user } = this.props;
    console.log(user);

    return (
      // <ContentContainer>
      <Container>
        <UserContainer>
          {/* <UserContentContainer> */}
            <Profile>
              <img
                src={
                  this.state.git === null
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTKCdkfRY6P9BDL8rex_-H0vu1vqTs0J7gQvyH3SNGTOQ&usqp=CAU&ec=45702844"
                    : this.state.git.avatar_url
                }
                style={{
                  display: "block",
                  margin: "auto",
                  border: "1px solid lightgray",
                  borderRadius: "50%",
                  width: "100px",
                }}
              />
              Hello, {user.username}
              <br />
              {this.state.git === null ? (
                <GitHub />
              ) : (
                <p>GitHub: {this.state.git.login}</p>
              )}
            </Profile>
            {/* <div style={{ gridColumnStart: "2" }}>
              <h2 style={{ textAlign: "center" }}>Performance</h2>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    <b>Tickets Assigned:</b> {user.stats.assigned}
                  </li>
                  <li>
                    <b>Tickets Claimed:</b> {user.stats.claimed}
                  </li>
                  <li>
                    <b>Tickets Completed:</b> {user.stats.completed}
                  </li>
                  <li>
                    <b>Hours Logged:</b> 967.07 hrs
                  </li>
                  <li>
                    <b>On Target Tickets:</b> 90
                  </li>
                </ul>
                <img
                  src={chart}
                  style={{ width: "100px", float: "right", padding: "8px" }}
                />
                <img
                  src={chart2}
                  style={{ width: "130px", float: "right", padding: "8px" }}
                />
              </div>
            </div> */}
          {/* </UserContentContainer> */}
        </UserContainer>
        <ProjectListContainer>
          <ProjectList />
        </ProjectListContainer>
        <DashBoardContainer>
          {/* FIXME: userboard will require a seperate component and API */}
          <Board dashboard={user.dashboard} />
        </DashBoardContainer>
      </Container>
      // {/* </ContentContainer> */}
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     update: () => dispatch(getUserData),
//   };
// };

export default connect(mapStateToProps)(UserDashBoard);
