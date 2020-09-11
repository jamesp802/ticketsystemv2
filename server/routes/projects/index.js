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

router.get("/:project_id", auth, (req, res) => {
  Project.getProject(req.params.project_id)
  //FIXME: verify ownership, public private boards, member
  .then((project) => {
    if (project.owners[req.user.id] === undefined) {
      return res.sendStatus(401);
    }
    res.send(project);
  }).catch(e => {
    console.log(e);
    res.sendStatus(404)
  })
})

module.exports = router;
