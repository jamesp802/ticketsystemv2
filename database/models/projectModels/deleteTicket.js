const Project = require("../../schemas/projectSchema");

module.exports = (projectId, tableId, ticketId, user) => {
  return Project.findById(projectId).then((proj) => {
    if (proj.owners[user.id] === undefined) {
      console.log(user.id);
      // not the owner
      throw new Error("NOT AUTHORIZED");
    } else {
      // Delete ticket from tickets object
      delete proj.dashboard.tickets[ticketId];

      // Delete ticket from table's ticket order
      let ticketOrderOnTable = proj.dashboard.tables[tableId].ticket_ids;
      for (let i = 0; i < ticketOrderOnTable.length; i++) {
        if (ticketOrderOnTable[i].toString() === ticketId) {
          ticketOrderOnTable.splice(i, 1);
        }
      }

      return Project.findByIdAndUpdate(projectId, proj, { new: true });
    }
  });
};
