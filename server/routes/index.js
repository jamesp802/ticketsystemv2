const express = require("express");
const router = express.Router({mergeParams: true});

const projectRouter = require('./projects')
const tableRouter = require('./tables')
const ticketRouter = require('./tickets')
const teamRouter = require('./teams')

var itemRouter = express.Router({mergeParams: true});

// you can nest routers by attaching them as middleware:

router.use('/projects', projectRouter);
router.route('/tables', tableRouter);
router.route('/tickets', ticketRouter);
router.route('/teams', teamRouter);

module.exports = router;