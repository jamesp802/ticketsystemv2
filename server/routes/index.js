const express = require("express");
const router = express.Router({mergeParams: true});

const projectRouter = require('./projects')
const tableRouter = require('./tables')
const ticketRouter = require('./tickets')
const teamRouter = require('./teams')

//FIXME: need to verify users are authorized to view projects

router.use('/projects', projectRouter);
router.use('/tables', tableRouter);
router.use('/tickets', ticketRouter);
router.route('/teams', teamRouter);

module.exports = router;