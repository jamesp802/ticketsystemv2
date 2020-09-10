
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    console.log("AUTH req.user", req.user)
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Invalid Token" });
  }
};