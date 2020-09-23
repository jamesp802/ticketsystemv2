const Project = require("../../schemas/projectSchema");

module.exports = (projectId, project) => {
  return Project.findByIdAndUpdate(projectId, { dashboard: project });
};
