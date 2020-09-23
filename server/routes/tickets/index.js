const express = require("express");
const router = express.Router();
const auth = require("../auth/middleware/auth");

const Ticket = require("../../../database/models/ticketModels");
const Project = require("../../../database/models/projectModels");

router.post("/new", auth, (req, res) => {
  // body, project_id, table_id
  const { ticket, projectId, tableId } = req.body;
  Ticket.addTicket(ticket, projectId, tableId, req.user)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
});

router.put("/edit/:projectId/ticket/:ticketId", auth, (req, res) => {
  const { projectId, ticketId } = req.params;
  const { body } = req;
  Project.updateTicket(projectId, ticketId, body)
  .then((data) => {
    // console.log(data);
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log(err);
    res.send(500);
  });
})

router.delete("/:projectId/:tableId/:ticketId", auth, (req, res) => {
  const { projectId, tableId, ticketId } = req.params;
  const { user } = req;
  Project.deleteTicketFromProject(projectId, tableId, ticketId, user)
    .then((data) => {
      // console.log(data);
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.send(401);
    });
});

module.exports = router;
