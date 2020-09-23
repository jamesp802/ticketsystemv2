const User = require("../../schemas/userSchema");

module.exports = (query) => {
  return User.find({ username: { $regex: query } }).then((results) => {
    return results.reduce((userArray, user) => {
      userArray.push({ username: user.username, _id: user._id });
      return userArray;
    }, []);
  });
};
