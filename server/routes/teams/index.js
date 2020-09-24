const express = require("express");
const router = express.Router();
const auth = require("../auth/middleware/auth");

const User = require("../../../database/models/userModels");
const Project = require("../../../database/models/projectModels/");

router.post("/search", auth, (req, res) => {
  const { query } = req.body;
  User.search(query)
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

router.post("/add", auth, (req, res) => {
  const { members, projectId } = req.body;

  User.addMembers(members, projectId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/claim", auth, (req, res) => {
  User.updateAndClaim(
    req.body.dashboard,
    req.body.projectId,
    req.user.id,
    req.body.ticketId
  )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/complete", auth, (req, res) => {
  User.updateAndComplete(
    req.body.dashboard,
    req.body.projectId,
    req.user.id,
    req.body.ticketId
  )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put("/unassign", auth, (req, res) => {
  const { projectId, ticketId, userId } = req.body;
  Project.unassignTicket(projectId, ticketId, userId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
});

router.put("/clean", auth, (req, res) => {
  User.clean(req.user.id, req.body.dashboard)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
});
module.exports = router;
