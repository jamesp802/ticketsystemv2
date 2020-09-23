import React from "react";
import styled from "styled-components";

import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: ${(props) => (props.isDragging ? "lightblue" : "white")};
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  padding: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

import TicketSettings from "./helpers/ticketSettings";
import LabelTicket from "./helpers/labelTicket";

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
              <LabelTicket label={this.props.ticket.label} />
            </Container>
          )}
        </Draggable>
        <TicketSettings
          show={this.state.showTicketSettings}
          handleShow={this.handleShowTicketSettings}
          ticket={this.props.ticket}
          update={this.props.update}
          tableId={this.props.tableId}
          projectId={this.props.projectId}
          members={this.props.members}
        />
      </>
    );
  }
}

export default Ticket;
