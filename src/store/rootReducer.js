// rootReducer.js
import { combineReducers } from "redux";
import { lecturerReducer } from "../reducers";
import { studentReducer } from "../reducers";
import { userReducer } from "../reducers/userReducer";

const rootReducer = combineReducers({
  student: studentReducer,
  lecturer: lecturerReducer,
  userReducer
  // Add other reducers if needed
});

export default rootReducer;
