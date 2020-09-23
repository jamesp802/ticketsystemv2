const Project = require("../../schemas/projectSchema");

const User = require("../../schemas/userSchema");

module.exports = (projectId, tableId, ticketId, user) => {
  return Project.findById(projectId).then((proj) => {
    if (proj.owners[user.id] === undefined) {
      console.log(user.id);
      // not the owner
      throw new Error("NOT AUTHORIZED");
    } else {
      const promiseArray = proj.dashboard.tickets[ticketId].assignedTo.map(
        (user) => {
          return User.findById(user[1]).then((member) => {
            delete member.dashboard.tickets[ticketId];

            for (
              let i = 0;
              i < member.dashboard.tables.assigned.ticket_ids.length;
              i++
            ) {
              if (member.dashboard.tables.assigned.ticket_ids[i].toString() === ticketId) {
                member.dashboard.tables.assigned.ticket_ids.splice(i, 1);
              }
            }

            for (
              let i = 0;
              i < member.dashboard.tables.claimed.ticket_ids.length;
              i++
            ) {
              if (member.dashboard.tables.claimed.ticket_ids[i].toString() === ticketId) {
                member.dashboard.tables.claimed.ticket_ids.splice(i, 1);
              }
            }

            for (
              let i = 0;
              i < member.dashboard.tables.completed.ticket_ids.length;
              i++
            ) {
              if (member.dashboard.tables.completed.ticket_ids[i].toString() === ticketId) {
                member.dashboard.tables.completed.ticket_ids.splice(i, 1);
              }
            }
            return User.findByIdAndUpdate(user[1], {
              dashboard: member.dashboard,
            });
          });
        }
      );
      return Promise.all(promiseArray).then(() => {
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
      });
    }
  });
};
