const selectedProjectReducer = (state = null, action) => {
  switch (action.type) {
    case "selectedProject":
      return action.selectedProject;
    default:
      return state;
  }
};

export default selectedProjectReducer;