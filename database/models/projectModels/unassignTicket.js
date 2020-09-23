const Project = require("../../schemas/projectSchema");

const User = require("../../schemas/userSchema");

module.exports = (projectId, ticketId, userId) => {
  return Project.findById(projectId).then((proj) => {
    const newAssignedArray = proj.dashboard.tickets[ticketId].assignedTo.map(
      (user, i) => {
        if (user[1] === userId) {
          proj.dashboard.tickets[ticketId].assignedTo.splice(i, 1);
          return Project.findByIdAndUpdate(projectId, {
            dashboard: proj.dashboard,
          }).then(() => {
            return User.findById(userId).then((user) => {
              delete user.dashboard.tickets[ticketId];
              return User.findByIdAndUpdate(userId, {
                dashboard: user.dashboard,
              });
            });
          });
        }
      }
    );
  });
};
