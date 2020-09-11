const Project = require("../../schemas/projectSchema");

const User = require("../../schemas/userSchema");

module.exports = (body, decodedUser) => {
  return User.findById(decodedUser.id).then((user) => {
    // creates project with name and sets the initial owner
    const proj = new Project({
      owners: {
        [user._id]: {
          owner_id: user._id,
          owner_username: user.username,
        },
      },
      project_name: body.project_name,
    });

    // Updates user projects list
    return proj.save().then((projectData) => {
      User.findByIdAndUpdate(
        { _id: user._id },
        {
          $push: {
            projects: {
              project_name: projectData.project_name,
              project_id: projectData._id,
            },
          },
        }
      );
    });
  });
};
