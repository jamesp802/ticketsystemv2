const User = require("../../schemas/userSchema");
const axios = require("axios");

module.exports = (repo, user) => {
  //FIXME: save repo name, request then go through like below but to end points of branch and commits
  return User.findById(user)
    .then((user) => {
      return axios.get(
        `https://api.github.com/repos/${user.git.login}/${repo}`,
        {
          headers: {
            Authorization: `token ${user.gitAccess}`,
          },
        }
      );
    })
    .then((data) => {
      return data.data;
    });
};
