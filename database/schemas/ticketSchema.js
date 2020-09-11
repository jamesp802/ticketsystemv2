const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
  ticket_name: String,
  ticket_description: String,
  assignedTo: String,
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("ticket", TicketSchema);
