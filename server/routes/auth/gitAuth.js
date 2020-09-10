const axios = require("axios");

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
        res
          .cookie("git_token", response.data.access_token, {
            //FIXME: maxage
            maxAge: 300000,
            httpOnly: true,
          })
          .status(200);
      });
  });

  app.get("/user/", (req, res, next) => {
    //FIXME: !hardcoded
    const accessToken = req.cookies.git_token;

    axios
      .get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      })
      .then((data) => {
        res.send(data.data);
      });
  });
};
