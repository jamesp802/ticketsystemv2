import React from "react";
import styled from "styled-components";

import { Droppable, Draggable } from "react-beautiful-dnd";

import Ticket from "./ticket";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 300px;
  background-color: white;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TicketList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "whitesmoke" : "white"};
  flex-grow: 1;
  min-height: 100px;
`;

class Table extends React.Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.table.table_id}
        index={this.props.index}
      >
        {(provided) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps}>{this.props.table.table_name}</Title>
            <Droppable droppableId={this.props.table.table_id}>
              {(provided, snapshot) => (
                <TicketList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {this.props.tickets.map((ticket, index) => (
                    <Ticket
                      key={ticket.ticket_id}
                      ticket={ticket}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </TicketList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Table;
