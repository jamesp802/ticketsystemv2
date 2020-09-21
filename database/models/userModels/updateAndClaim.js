const User = require("../../schemas/userSchema");

const Project = require("../../schemas/projectSchema");

module.exports = (dashboard, projectId, userId, ticketId) => {
  return User.findById(userId).then((user) => {
    user.dashboard = dashboard;
    user.stats.claimed += 1;
    return User.findByIdAndUpdate(userId, user).then(() => {
      return Project.findById(projectId).then((project) => {

        let claimTableId;
        for (let id in project.dashboard.tables) {
          for (
            let i = 0;
            i < project.dashboard.tables[id].ticket_ids.length;
            i++
          ) {
            if (project.dashboard.tables[id].ticket_ids[i].toString() === ticketId) {
              project.dashboard.tables[id].ticket_ids.splice(i, 1);
            }
          }

          if (project.dashboard.tables[id].forClaims === true) {
            console.log("forclaimed :", project.dashboard.tables[id].ticket_ids);
            claimTableId = id;
            project.dashboard.tables[id].ticket_ids.push(ticketId);
          }
        }
        return Project.findByIdAndUpdate(projectId, {dashboard: project.dashboard})
      });
    });
  });
};
