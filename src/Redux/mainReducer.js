import { combineReducers } from "redux";

import user from "./reducers/user";
import selectedProject from "./reducers/selectedProject";

export default combineReducers({
  user,
  selectedProject,
});
