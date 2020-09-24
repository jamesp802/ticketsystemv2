/**
 * Board Container
 */
import React from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

import { userData, projectData } from "../../initialData";
import Table from "./table";
import axios from "axios";

import AddTable from "./helpers/addTable";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

class Board extends React.Component {
  state = this.props.dashboard;

  componentWillReceiveProps(props) {
    this.setState(props.dashboard);
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.draggableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "table") {
      const newTableOrder = Array.from(this.state.table_order);
      newTableOrder.splice(source.index, 1);
      newTableOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        table_order: newTableOrder,
      };

      this.setState(newState, () => {
        axios.post(`/api/projects/${this.props.projectId}`, {
          dashboard: newState,
        });
      });
    }

    const start = this.state.tables[source.droppableId];
    const end = this.state.tables[destination.droppableId];

    if (start === end) {
      const table = this.state.tables[source.droppableId];
      const newTicketIds = Array.from(table.ticket_ids);

      newTicketIds.splice(source.index, 1);
      newTicketIds.splice(destination.index, 0, draggableId);

      const newTable = {
        ...table,
        ticket_ids: newTicketIds,
      };

      const newState = {
        ...this.state,
        tables: {
          ...this.state.tables,
          [newTable._id]: newTable,
        },
      };
      this.setState(newState, () => {
        axios.post(`/api/projects/${this.props.projectId}`, {
          dashboard: newState,
        });
      });

      return;
    }

    const newTicketIds = Array.from(start.ticket_ids);
    newTicketIds.splice(source.index, 1);
    const newStart = {
      ...start,
      ticket_ids: newTicketIds,
    };

    const endTicketIds = Array.from(end.ticket_ids);
    endTicketIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...end,
      ticket_ids: endTicketIds,
    };

    const newState = {
      ...this.state,
      tables: {
        ...this.state.tables,
        [newStart._id]: newStart,
        [newEnd._id]: newEnd,
      },
    };

    this.setState(newState, () => {
      axios.post(`/api/projects/${this.props.projectId}`, {
        dashboard: newState,
      });
    });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="all-tables" direction="horizontal" type="table">
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {this.state.table_order.map((table_id, index) => {
                const table = this.state.tables[table_id];
                const tickets = table.ticket_ids.map((ticket_id) => {
                  return this.state.tickets[ticket_id];
                });

                return (
                  <Table
                    key={table._id}
                    table={table}
                    tickets={tickets}
                    index={index}
                    projectId={this.props.projectId}
                    update={this.props.update}
                    members={this.props.members}
                    repo={this.state.repo}
                  />
                );
              })}
              <AddTable
                update={this.props.update}
                projectId={this.props.projectId}
              />
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Board;
