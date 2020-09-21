const express = require("express");
const router = express.Router();
const auth = require("../auth/middleware/auth");

const Table = require("../../../database/models/tableModels");

router.post("/new", auth, (req, res) => {
  const { tableName, projectId, forClaims } = req.body;
  console.log(tableName, projectId)
  Table.addTable(tableName, projectId, forClaims)
  .then(() => {
    res.sendStatus(201);
  })
  .catch((e) => {
    console.log(e);
    res.sendStatus(500);
  })
});

module.exports = router;