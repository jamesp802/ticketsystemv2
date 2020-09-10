const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gitAccess: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  projects: [{
      project_id: {type: String, unique: true},
      project_name: {type: String, unique: true}
    }],
  dashboard: {
    tables: Object,
    tickets: Object,
    table_order: Array,
  },
});

module.exports = mongoose.model("user", UserSchema);
