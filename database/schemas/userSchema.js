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
  projects: [
    {
      project_id: String,
      project_name: String,
    },
  ],
  dashboard: {
    tables: {
      type: Object,
      default: {
        assigned: {
          _id: "assigned",
          table_name: "Assigned",
          ticket_ids: [],
        },
        claimed: {
          _id: "claimed",
          table_name: "Claimed",
          ticket_ids: [],
        },
        completed: {
          _id: "completed",
          table_name: "Completed",
          ticket_ids: [],
        },
      },
    },
    tickets: Object,
    table_order: { type: Array, default: ["assigned", "claimed", "completed"] },
  },
});

module.exports = mongoose.model("user", UserSchema);
