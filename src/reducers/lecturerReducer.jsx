import { LOGIN_LECTURER, LOGOUT_LECTURER, FETCH_LECTURER_FAILURE, FETCH_LECTURER_REQUEST, SET_LECTURER_DATA } from "../actions/lecturers/lecturerActions";
const initialState = {
  isLoggedIn: false,
  lecturerInfo: {},
  loading: false,
  error: "",
  classes: [],
};

export const lecturerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LECTURER_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case SET_LECTURER_DATA:
      return {
        ...state,
        lecturerInfo: action.payload, // Update lecturer information
        loading: false,
        error: "",
      };

    case FETCH_LECTURER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload ,
      };

    case LOGIN_LECTURER: // Assuming you have a separate action for lecturer login
      return {
        ...state,
        isLoggedIn: true,
        error: "",
      };

    case LOGOUT_LECTURER: // Assuming you have a separate action for lecturer logout
      return {
        ...state,
        isLoggedIn: false,
        lecturerInfo: {}, // Reset lecturer information on logout
        classes : [],
        error: "",
      };

    default:
      return state;
  }
};
