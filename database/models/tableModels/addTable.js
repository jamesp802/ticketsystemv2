const Project = require("../../schemas/projectSchema");

const User = require("../../schemas/userSchema");

const Table = require("../../schemas/tableSchema");

module.exports = (table_name, project_id) => {
  const table = new Table({
    table_name: table_name,
  });

  return table.save().then((table) => {
    let tableData = table;
    return Project.findById(project_id).then((project) => {

      if (project.dashboard.tables === undefined) {
        project.dashboard.tables = {
          [tableData._id]: table,
        }
        project.dashboard.table_order.push(tableData._id);
      } else {
        project.dashboard.tables[tableData._id] = table;
        project.dashboard.table_order.push(tableData._id);
      }
      return Project.findByIdAndUpdate(project_id, project)
    });
  });
};
