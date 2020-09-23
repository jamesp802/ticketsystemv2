const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema({
  team_id: "team_id",
  team_name: "teamname",
});

module.exports = TeamSchema;