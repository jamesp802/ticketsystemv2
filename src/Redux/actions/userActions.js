import axios from "axios";

// login

// verify token and get user
export const getUserData = () => (dispatch) => {
  return axios
    .get("/user/me")
    .then((response) => {
      dispatch({
        type: "user",
        user: response.data,
      });
    })
    .then(() => {
      // return axios
      //   .get("/user")
      //   .then((response) => {
      //     console.log(response.data);
      //     this.setState({
      //       git: response.data,
      //     });
      //   })
      //   .catch((e) => {
      //     {
      //       console.log("ERROR: ", e);
      //     }
      //   });
    })
    .then(() => {
      setInterval(() => {
        return axios.get("/user/me").then((response) => {
          dispatch({
            type: "user",
            user: response.data,
          });
        });
      }, 60000);
    })
    .catch((err) => {
      console.log("USER ACTION: getUserData ERROR:", err);
    });
};

// destory token, log user out
