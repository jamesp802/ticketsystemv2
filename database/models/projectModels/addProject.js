const Project = require("../../schemas/projectSchema");

module.exports = (body) => {
  const proj = new Project(body)
  return proj.save();
}

