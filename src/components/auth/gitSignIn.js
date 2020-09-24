import React from "react";

import styled from "styled-components";
import { Button } from "react-bootstrap";

const Container = styled.div`
  margin: auto;
`;

class GitSignIn extends React.Component {
  render() {
    return (
      <Container>
        <Button variant="secondary" size="sm" href="https://github.com/login/oauth/authorize?client_id=d2771792fc2b807f52dd&scope=repo">
          Sign In With GitHub
        </Button>
      </Container>
    );
  }
}

export default GitSignIn;
