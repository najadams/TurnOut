export const FETCH_LECTURER_FAILURE = "FETCH_LECTURER_FAILURE";
export const FETCH_LECTURER_REQUEST = "FETCH_LECTURER_REQUEST";
export const SET_LECTURER_DATA = "SET_LECTURER_DATA";
export const LOGOUT_LECTURER = "LOGOUT_LECTURER";
export const LOGIN_LECTURER = "LOGIN_LECTURER";
export const LOGIN_LECTURER_FAILURE = "LOGIN_LECTURER_FAILURE";
export const GET_STUDENTS_SUCCESS = "GET_STUDENTS_SUCCESS";
export const GET_STUDENTS_FAILURE = "GET_STUDENTS_FAILURE";
export const GET_CLASSES_SUCCESS = "GET_CLASSES_SUCCESS";


export const fetchLecturerRequest = () => ({
  type: FETCH_LECTURER_REQUEST,
});

export const setLecturerData = (data) => ({
  type: SET_LECTURER_DATA,
  payload: data,
});

export const fetchLecturerFailure = (error) => ({
  type: FETCH_LECTURER_FAILURE,
  payload: error,
});

export const loginLecturerSuccess = () => ({
  type: LOGIN_LECTURER,
});
export const loginLecturerFailure = (error) => ({
  type: LOGIN_LECTURER_FAILURE,
  payload: error
});

export const logoutLecturer = () => ({
  type: LOGOUT_LECTURER,
});

export const getStudentsSuccess = (students) => ({
  type: GET_STUDENTS_SUCCESS,
  payload: students,
});
export const getClasses = (classes) => ({
  type: GET_CLASSES_SUCCESS,
  payload: classes,
});

// Action creator for failure in student data retrieval
export const getStudentsFailure = (error) => ({
  type: GET_STUDENTS_FAILURE,
  payload: error,
});
