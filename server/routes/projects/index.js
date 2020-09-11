const express = require("express");
const router = express.Router();
const auth = require("../auth/middleware/auth");

const Project = require("../../../database/models/projectModels/");

router.post("/new", auth, (req, res) => {
  const { projectName } = req.body;
  Project.addProject(req.body, req.user)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
});

module.exports = router;
