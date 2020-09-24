const Project = require("../../schemas/projectSchema");

const User = require("../../schemas/userSchema");

const axios = require("axios");

module.exports = (userId, projectId) => {
  return User.findById(userId)
  .then((user) => {
    return Project.findById(projectId)
    .then((project) => {
      return axios
      .get(`${project.repo}/branches`, {
        headers: {
          Authorization: `token ${user.gitAccess}`,
        },
      })
      .then((data) => {
        return data.data
      })
    })
  })
};
