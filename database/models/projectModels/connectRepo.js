const User = require("../../schemas/userSchema");
const axios = require("axios");
const Project = require("../../schemas/projectSchema");

module.exports = (repo, user) => {
  return User.findById(user).then((user) => {
    if (user.git.login === "") {
      return res.sendStatus(401);
    }

    if (user.gitAccess === null) {
      return res.sendStatus(401);
    }

    return axios
      .get(`https://api.github.com/repos/${user.git.login}/${repo}`, {
        headers: {
          Authorization: `token ${user.gitAccess}`,
        },
      })
      .then(() => {
        return Project.findByIdAndUpdate(projectId, {
          repo: `https://api.github.com/repos/${user.git.login}/${repo}`,
        });
      })
  });
};
// module.exports = (repo, user) => {
//   //FIXME: save repo name, request then go through like below but to end points of branch and commits
//   return User.findById(user)
//     .then((user) => {
//       return axios.get(
//         `https://api.github.com/repos/${user.git.login}/${repo}`,
//         {
//           headers: {
//             Authorization: `token ${user.gitAccess}`,
//           },
//         }
//       );
//     })
//     .then((data) => {
//       return data.data;
//     });
// };
