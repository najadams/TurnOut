import {
  FETCH_STUDENT_FAILURE,
  FETCH_STUDENT_REQUEST,
  SET_STUDENT_DATA,
  LOGIN_STUDENT,
  LOGOUT_STUDENT,
} from '../actions/students/studentActions'

const initialState = {
  isLoggedIn: false,
  data: {},
  loading: false,
  error: "",
};

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case SET_STUDENT_DATA:
      return {
        ...state,
        data: action.payload,
        error: "",
      };

    case FETCH_STUDENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGIN_STUDENT:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        error: "",
      };

    case LOGOUT_STUDENT:
      return {
        ...state,
        isLoggedIn: false,
        data: {},
        error: "",
      };

    default:
      return state;
  }
};
