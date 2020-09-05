import React from "react";
import styled from "styled-components";

import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: ${(props) => (props.isDragging ? "lightblue" : "white")};
`;

class Ticket extends React.Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.ticket.ticket_id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.ticket.ticket_title}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Ticket;
