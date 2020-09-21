const Project = require("../../schemas/projectSchema");

const User = require("../../schemas/userSchema");

const Ticket = require("../../schemas/ticketSchema");

const assignTicket = require("../userModels/assignTicket");

module.exports = (ticketInfo, project_id, table_id) => {
  const ticket = new Ticket({
    ticket_name: ticketInfo.ticketName,
    ticket_description: ticketInfo.ticketDescription,
    assignedTo: ticketInfo.assignedTo,
    project_id: ticketInfo.projectId,
  });

  return ticket.save().then((ticketData) => {
    const ticket = ticketData;
    return assignTicket(ticket.assignedTo, ticket).then(() => {
      return Project.findById(project_id).then((project) => {
        if (project.dashboard.tickets === undefined) {
          project.dashboard.tickets = {
            [ticket._id]: ticket,
          };
          project.dashboard.tables[table_id].ticket_ids.push(ticket._id);
          console.log(project.dashboard.tables[table_id].ticket_ids);
        } else {
          project.dashboard.tickets[ticket._id] = ticket;
          project.dashboard.tables[table_id].ticket_ids.push(ticket._id);
        }
        return Project.findByIdAndUpdate(project_id, project);
      });
    });
  });
};
