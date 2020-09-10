const axios = require("axios");

const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const User = require("../../../database/schemas/userSchema");

module.exports = (app) => {
  app.get("/user/signin/callback", (req, res, next) => {
    const { query } = req;
    const { code } = query;

    // Failed Sign In
    if (code === null) {
      res.send({
        success: false,
        message: "ERROR: no code",
      });
    }

    // Successful Sign In
    const config = {
      headers: {
        Accept: "application/json",
      },
    };

    axios
      .post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: "d2771792fc2b807f52dd",
          client_secret: "86b289ce901ea1fcfb4ec9f1348b2da8882385f8",
          code: code,
        },
        config
      )
      .then((response) => {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "Auth Error" });

        const decoded = jwt.verify(token, "randomString");
        console.log(decoded);

        let user = User.findById(decoded.user.id)
          .then((user) => {
            console.log(user);
            user.gitAccess = response.data.access_token;
            user.save();
          })
          .then((data) => {
            console.log(data);
            res.redirect("/dash");
          })
          .catch((err) => {
            res.send(500).json({
              message: "ERROR: failed to save access token",
            });
          });
      });
  });

  app.get("/user/", auth, async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const { gitAccess } = user;

    axios
      .get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${gitAccess}`,
        },
      })
      .then((data) => {
        res.send(data.data);
      });
  });
};
