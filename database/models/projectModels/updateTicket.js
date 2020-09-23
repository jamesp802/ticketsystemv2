const Project = require("../../schemas/projectSchema");

const User = require("../../schemas/userSchema");

module.exports = (projectId, ticketId, ticketInfo) => {
  return Project.findById(projectId).then((proj) => {
    //FIXME: unassign a member from ticket
    let newAssigned = ticketInfo.assignedTo;
    let newName = ticketInfo.ticketName;
    let newDescription = ticketInfo.ticketDescription;
    let newLabel = ticketInfo.label;
    console.log(newAssigned)


    proj.dashboard.tickets[ticketId].assignedTo = newAssigned;
    proj.dashboard.tickets[ticketId].ticket_name = newName;
    proj.dashboard.tickets[ticketId].ticket_description = newDescription;
    proj.dashboard.tickets[ticketId].label = newLabel;

    const newTicket = proj.dashboard.tickets[ticketId];


    let membersToUpdateArray = proj.dashboard.tickets[ticketId].assignedTo;
    membersToUpdateArray = membersToUpdateArray.map((user) => {
      return User.findById(user[1]).then((member) => {
        member.dashboard.tickets[ticketId] = newTicket;
        member.dashboard.tables.assigned.ticket_ids.push(ticketId);
        return User.findByIdAndUpdate(user[1], {
          dashboard: member.dashboard,
        });
      });
    });

    return Promise.all(membersToUpdateArray).then(() => {
      return Project.findByIdAndUpdate(projectId, {
        dashboard: proj.dashboard,
      });
    });
  });
};
