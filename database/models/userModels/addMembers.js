const Project = require("../../schemas/projectSchema");

module.exports = (newMembers, projectId) => {
  return Project.findById(projectId).then((proj) => {
    let currentMembers = proj.members === undefined ? {} : proj.members;
    newMembers.forEach((newMember) => {
      if (currentMembers[newMember._id] === undefined) {
        currentMembers[newMember._id] = newMember;
      }
    });
    return Project.findByIdAndUpdate(projectId, { members: currentMembers });
  });
};
