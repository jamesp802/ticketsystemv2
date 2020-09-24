const Project = require("../../schemas/projectSchema");

const User = require("../../schemas/userSchema");
const axios = require("axios");
module.exports = (userId, branch) => {
  return User.findById(userId).then((user) => {
    let test = branch.split('/')
    test.pop()
    test = test.join('/')

    if (user.gitAccess) {
      return axios
        .get(`${test}`, {
          headers: {
            Authorization: `token ${user.gitAccess}`,
          },
        })
        .then((data) => {
          return data.data;
        });
    } else {
      return axios
        .get(`${test}`)
        .then((data) => {
          return data.data;
        });
    }
  });
};
