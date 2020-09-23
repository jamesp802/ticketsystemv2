const addProject = require("./addProject");
const getProject = require("./getProject");
const updateProject = require("./updateProject");
const deleteTicketFromProject = require("./deleteTicket");
const deleteProject = require("./deleteProject");
const updateTicket = require("./updateTicket");
const unassignTicket = require("./unassignTicket");

module.exports = {
  addProject,
  getProject,
  updateProject,
  deleteTicketFromProject,
  deleteProject,
  updateTicket,
  unassignTicket,
};
