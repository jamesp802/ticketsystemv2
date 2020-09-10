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

import GitHub from "../auth/gitSignIn";

import Board from "../board/board";

const Container = styled.div`
display: grid;
grid-template-columns: 50px auto 50px;
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



class UserDashBoard extends React.Component {
  render() {
    return (
      <Container>
        <Title>Hello, {userData.username}</Title>
        <DashBoardContainer>
          <Board dashboard={projectData.dashboard} />
        </DashBoardContainer>
        <GitHub/>
      </Container>
    );
  }
}

export default UserDashBoard;
