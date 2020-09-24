const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  project_name: String,
  owners: Object,
  dashboard: {
    tables: Object,
    tickets: Object,
    table_order: Array,
  },
  members: Object,
  repo: { type: String, default: null },
});

const Project = mongoose.model("project", ProjectSchema);

module.exports = Project;
