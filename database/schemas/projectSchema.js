const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  // owners: {
  //   owner_user_id: {
  //     user_id: "user_id (owner)",
  //     username: "username (owner)",
  //   },
  // },
  project_name: String,
  owners: Object,
  dashboard: {
    tables: Object,
    tickets: Object,
    table_order: Array,
  },
  teams: Object
})

const Project = mongoose.model("project", ProjectSchema);

module.exports = Project;