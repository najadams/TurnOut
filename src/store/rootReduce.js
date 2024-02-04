// rootReducer.js
import { combineReducers } from "redux";
import { lecturerReducer } from "../reducers";
import { studentReducer } from "../reducers";
import { userReducer } from "../reducers/userReducer";

const rootReducer = combineReducers({
  user : userReducer,
  student: studentReducer,
  lecturer: lecturerReducer,
  // Add other reducers if needed
});

export default rootReducer;
