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
      if (
        project.owners[req.user.id] === undefined &&
        project.members[req.user.id] === undefined
      ) {
        return res.sendStatus(401);
      }
      res.send(project);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(404);
    });
});

router.post("/:project_id", auth, (req, res) => {
  Project.updateProject(req.params.project_id, req.body.dashboard)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
});

router.delete("/:project_id", auth, (req, res) => {
  Project.deleteProject(req.params.project_id, req.user)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

router.post("/repo/branches", auth, (req, res) => {
  Project.getBranches(req.user.id, req.body.projectId)
  .then((data) => {
    res.send(data);
  })
  .catch((e) => {
    console.log(e)
    res.sendStatus(404);
  });
})

router.post("/repo/branch/commits", auth, (req, res) => {
  Project.connectBranch(req.user.id, req.body.branch)
  .then((data) => {
    res.send(data);
  })
  .catch((e) => {
    console.log(e)
    res.sendStatus(404);
  });
})

router.post("/repo/connect", auth, (req, res) => {
  Project.connectRepo(req.body.repo, req.user.id, req.body.projectId)
  .then((data) => {
    res.send(data);
  })
  .catch((e) => {
    console.log(e)
    res.sendStatus(404);
  });
})

module.exports = router;
