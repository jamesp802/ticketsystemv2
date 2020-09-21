const User = require("../../schemas/userSchema");

module.exports = (users, ticket) => {
  // console.log(users, ticket);
  let test = users.map((user) => {
    User.findById(user[1]).then((user) => {
      user.stats.assigned += 1;
      if (user.dashboard.tickets === undefined) {
        user.dashboard.tickets = {
          [ticket._id]: ticket,
        };
        user.dashboard.tables.assigned.ticket_ids.push(ticket._id);
        // console.log(user.dashboard.tables.assigned.ticket_ids);
      } else {
        user.dashboard.tickets[ticket._id] = ticket;
        user.dashboard.tables.assigned.ticket_ids.push(ticket._id);
      }
      return User.findByIdAndUpdate(user._id, user);
    });
  });

  return Promise.all(test);
};
