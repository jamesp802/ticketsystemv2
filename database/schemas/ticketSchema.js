const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
  ticket_title: "assigned_ticket_id_1 title",
  ticket_description: "assigned_ticket_id_1 description",
});

module.exports = TicketSchema;
