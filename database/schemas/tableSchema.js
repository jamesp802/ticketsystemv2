const mongoose = require("mongoose");

const TableSchema = mongoose.Schema({
  table_name: "Assigned",
  ticket_ids: ["assigned_ticket_id_1", "assigned_ticket_id_2"],
});

module.exports = TableSchema;
