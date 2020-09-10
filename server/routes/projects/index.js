const express = require("express");
const router = express.Router();
const auth = require("../auth/middleware/auth");

const User = require("../../../database/schemas/userSchema");
const Project = require("../../../database/models/projectModels/");

router.post("/new", auth, (req, res) => {
  const { projectName } = req.body;

  Project.addProject(req.body)
    .then((projectData) => {
      // save to user
      User.findOneById(req.user.id)
      .then((user) => {
        user.projects.push({
          project_id: projectData._id,
          project_name: projectData.project_name,
        });
        return user.save()
      });
    })
    .catch((err) => {
      console.error(err);
      res.send(500).json({
        message: "ERROR: failed to add new project to database",
      });
    });
});

module.exports = router;
