export const FETCH_STUDENT_FAILURE = "FETCH_STUDENT_FAILURE";
export const FETCH_STUDENT_REQUEST = "FETCH_STUDENT_REQUEST";
export const SET_STUDENT_DATA = "SET_STUDENT_DATA"; // Assuming FETCH_STUDENT_SUCCESS is SET_STUDENT_DATA
export const LOGIN_STUDENT = "LOGIN_STUDENT";
export const LOGOUT_STUDENT = "LOGOUT_STUDENT";

export const fetchStudentRequest = () => {
  return {
    type: FETCH_STUDENT_REQUEST,
  };
};

export const fetchStudentSuccess = (data) => {
  return {
    type: SET_STUDENT_DATA,
    payload: data,
  };
};

export const fetchStudentFailure = (error) => {
  return {
    type: FETCH_STUDENT_FAILURE,
    payload: error,
  };
};

export const loginStudentSuccess = () => {
  return {
    type: LOGIN_STUDENT,
  };
};

export const logoutStudent = () => {
  return {
    type: LOGOUT_STUDENT,
  };
};
