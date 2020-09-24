const User = require("../../schemas/userSchema");

module.exports = (user, dashboard) => {
  return User.findByIdAndUpdate(user, {dashboard: dashboard})
}