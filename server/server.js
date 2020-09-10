// express connection
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const user = require("./routes/auth/user");
const DATABASE = require("../database/connect");
//FIXME: var cookieSession = require('cookie-session')
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

const app = express();

// PORT
const port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../dist/")));


require("./routes/auth/gitAuth")(app);

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */

app.use("/user", user);

// const userRouter = require('./routes/userRouter');
// app.use('/api/users', userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/"));
});

app.listen(port, console.log(`App is listening on ${port}`));
