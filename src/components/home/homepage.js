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
          textAlign: "center",
          paddingTop: "0px"
        }}
      >
        {/* <img
          src="https://media.giphy.com/media/l0HlTy9x8FZo0XO1i/giphy.gif"
          style={{ display: "block", margin: "auto" }}
        /> */}

        <img
          src="https://media.giphy.com/media/l0HlTy9x8FZo0XO1i/giphy.gif"
          style={{ float: "center", width: "250px", height: '100px' }}
        />
        <h1>Pyrotech.io Ticketing System</h1>
        <p>
          An Agile Software Development Tool for Personal, and Team Projects.
          <br />
          <br />
          <b>Released: 9/25/2020</b>
          This application is in development
        </p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/b5JsNdf3-Vk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style={{ display: "block", margin: "auto", padding: "10px" }} allowfullscreen></iframe>
      </div>
    );
  }
}

export default Home;
