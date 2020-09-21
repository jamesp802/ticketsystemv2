const mongoose = require("mongoose");

const TableSchema = mongoose.Schema({
  table_name: String,
  ticket_ids: Array,
  forClaims: { type: Boolean, default: false },
});

module.exports = mongoose.model("table", TableSchema);
