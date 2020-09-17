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

module.exports = router;
