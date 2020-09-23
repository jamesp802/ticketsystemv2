const auth = { token: "", isAuth: false };

const tokenReducer = (state = auth, action) => {
  switch (action.type) {
    case "token":
      return action.token;
    default:
      return state;
  }
};

export default tokenReducer;
