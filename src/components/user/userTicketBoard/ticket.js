import React from "react";
import styled from "styled-components";

import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: ${(props) => (props.isDragging ? "lightblue" : "white")};
`;

// import TicketSettings from "./helpers/ticketSettings";

class Ticket extends React.Component {
  state = {
    showTicketSettings: false,
  };

  handleShowTicketSettings = (e) => {
    //FIXME: take id
    this.setState({
      showTicketSettings: !this.state.showTicketSettings,
    });
  };

  render() {
    return (
      <>
        <Draggable draggableId={this.props.ticket._id} index={this.props.index}>
          {(provided, snapshot) => (
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              onClick={this.handleShowTicketSettings}
            >
              {this.props.ticket.ticket_name}
            </Container>
          )}
        </Draggable>
      </>
    );
  }
}

export default Ticket;
