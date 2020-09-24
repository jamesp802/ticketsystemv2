import React from 'react'
import styled from "styled-components";

const Indicator = styled.div`
  float: right;
  width: 20px;
  height: 20px;
  margin: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const LabelTicket = ({ label }) => {
  if (label === "Research") {
    return <Indicator style={{ background: "blue" }} />;
  } else if (label === 'Review') {
    return <Indicator style={{ background: "red" }} />;
  } else if (label === 'Implementation') {
    return <Indicator style={{ background: "yellow" }} />;
  } else if (label === 'Test') {
    return <Indicator style={{ background: "green" }} />;
  }


  else {
    return null;
  }
};

export default LabelTicket;
