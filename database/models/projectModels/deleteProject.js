const Project = require("../../schemas/projectSchema");

const User = require("../../schemas/userSchema");

const deleteFromUser = (projectId, userId) => {
  return User.findById(userId).then((user) => {
    console.log(user.projects);
    for (var i = 0; i < user.projects.length; i++) {
      console.log('LOGS::: ', user.projects[i].project_id, projectId)
      if (user.projects[i].project_id === projectId) {
        console.log("match");
        let newUserProjects = user.projects;
        newUserProjects.splice(i, 1);

        return User.findByIdAndUpdate(userId, { projects: newUserProjects });
      }
    }
  });
};

module.exports = (projectId, user) => {
  return Project.findById(projectId).then((proj) => {
    if (proj.owners[user.id] === undefined) {
      console.log(user.id);
      // not the owner
      throw new Error("NOT AUTHORIZED");
    } else {
      // Delete ticket from tickets object
      return Project.findByIdAndDelete(projectId).then(() => {
        return deleteFromUser(projectId, user.id);
      });
    }
  });
};
