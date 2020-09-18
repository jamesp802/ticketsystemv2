import React from "react";

import styled from "styled-components";

import { Jumbotron, Button } from "react-bootstrap";

class Home extends React.Component {
  render() {
    return (
      <div
        className="jumbotron"
        style={{
          backgroundColor: "#0e1217",
          color: "white",
        }}
      >
        <img
          src="https://media.giphy.com/media/l0HlTy9x8FZo0XO1i/giphy.gif"
          style={{ display: "block", margin: "auto" }}
        />
        <h1>
          Pyrotech.io Fire Ticketing System <b>ALPHA 1.0</b>
        </h1>
        <p>
          An Agile Software Development Tool for Personal, and Team Projects.
          <br />
          <br />
          This application is in development
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </div>
    );
  }
}

export default Home;
