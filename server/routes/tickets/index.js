const express = require("express");
const router = express.Router();
const auth = require("../auth/middleware/auth");

const Ticket = require("../../../database/models/ticketModels");

router.post("/new", auth, (req, res) => {
  // body, project_id, table_id
  const { ticket, projectId, tableId } = req.body;
  Ticket.addTicket(ticket, projectId, tableId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
});

module.exports = router;
