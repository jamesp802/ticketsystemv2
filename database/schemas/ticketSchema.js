const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
  ticket_name: String,
  ticket_description: String,
  assignedTo: Array,
  createdAt: { type: Date, default: Date.now() },
  project_id: String,
  label: String,
  createdBy: Object,
});

module.exports = mongoose.model("ticket", TicketSchema);
