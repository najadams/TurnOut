export const FETCH_LECTURER_FAILURE = "FETCH_LECTURER_FAILURE";
export const FETCH_LECTURER_REQUEST = "FETCH_LECTURER_REQUEST";
export const SET_LECTURER_DATA = "SET_LECTURER_DATA";
export const LOGOUT_LECTURER = "LOGOUT_LECTURER";
export const LOGIN_LECTURER = "LOGIN_LECTURER";
export const LOGIN_LECTURER_FAILURE = "LOGIN_LECTURER_FAILURE";
export const GET_STUDENTS_SUCCESS = "GET_STUDENTS_SUCCESS";
export const GET_STUDENTS_FAILURE = "GET_STUDENTS_FAILURE";


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

// Action creator for failure in student data retrieval
export const getStudentsFailure = (error) => ({
  type: GET_STUDENTS_FAILURE,
  payload: error,
});

// export const getLecturerLoggedIn = (email, password) => {
//   return async (dispatch) => {
//     dispatch(fetchLecturerRequest());

//     try {
//       const response = await fetch(`${API_BASE_URL}/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         dispatch(loginLecturerFailure(errorData.message || "Login failed"));
//         throw new Error(errorData.message || "Login failed");
//       }

//       const data = await response.json();

//       const { token, user } = data;

//       // Save the token in local storage
//       // setTokenInStorage(token);

//       // Dispatch the success action with the user data
//       dispatch(loginLecturerSuccess());

//       // Dispatch setLecturerData action to update lecturer information in the state
//       dispatch(setLecturerData(user));

//       return user; // Return the user data if needed
//     } catch (error) {
//       console.error("Error during login:", error.message);
//       dispatch(loginLecturerFailure("Login failed"));
//       throw new Error("Login failed");
//     }
//   };
// };