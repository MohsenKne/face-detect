import { combineReducers } from "redux";

import auth from "./auth";
import users from "./users";
import rollCall from "./rollCall";

export default combineReducers({
  auth: auth,
  users: users,
  rollCall: rollCall,
});
