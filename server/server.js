// express connection
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist/')));

// API ROUTES
// const db = require("./database/MongoConnect");

// const userRouter = require('./routes/userRouter');
// app.use('/api/users', userRouter);

require('./routes/auth/gitAuth')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/'))
})

const port = process.env.PORT || 3000;
app.listen(port, console.log(`App is listening on ${port}`));
