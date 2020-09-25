const Project = require("../../schemas/projectSchema");

const User = require("../../schemas/userSchema");

module.exports = (newMembers, projectId) => {
  return Project.findById(projectId).then((proj) => {
    let currentMembers = proj.members === undefined ? {} : proj.members;
    newMembers.forEach((newMember) => {
      if (currentMembers[newMember._id] === undefined) {
        currentMembers[newMember._id] = newMember;
      }
    });
    return Project.findByIdAndUpdate(
      projectId,
      { members: currentMembers },
      { new: true }
    ).then((proj) => {
      // let memberships = proj.memberships === undefined ? [] : proj.memberships;
      let userIdArray = Object.keys(proj.members);
      let promiseArray = userIdArray.slice(1).map((member) => {
        return User.findByIdAndUpdate(member, {
          $push: {
            memberships: {
              project_id: proj._id,
              project_name: proj.project_name,
            },
          },
        });
      });
      console.log(promiseArray);
      return Promise.all(promiseArray);
    });
  });
};
