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
    .catch((err) => {
      console.log("USER ACTION: getUserData ERROR:", err);
    });
};

// destory token, log user out
