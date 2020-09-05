const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/ticketv2', {useNewUrlParser: true});

const DATABASE = mongoose.connection;
DATABASE.on('error', console.error.bind(console, 'connection error:'));
DATABASE.once('open', function() {
  console.log('Mongoose Connected Successfully')
});

module.exports = DATABASE;