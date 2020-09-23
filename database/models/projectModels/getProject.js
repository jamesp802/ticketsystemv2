const Project = require("../../schemas/projectSchema");

module.exports = (projectId) => {
  return Project.findById(projectId)
};
