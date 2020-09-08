const axios = require("axios");

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
        console.log("POST GITHUB OAUTH DATA", response.data);
        res.send(response.data)
      });
  });

  app.get("/user/", (req, res, next) => {
    const accessToken = "c974002827ea6bb2ed1f9a91291b0db4aa57a3ff";

    axios
      .get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      })
      .then((data) => {
        console.log(data.data);
        res.send(data.data);
      });
  });
};
