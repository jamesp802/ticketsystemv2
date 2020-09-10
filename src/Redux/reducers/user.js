const userReducer = (state = null, action) => {
  switch (action.type) {
    case "user":
      return action.user;
    default:
      return state;
  }
};

export default userReducer;