import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router";
import {
  fetchLecturerFailure,
  fetchLecturerRequest,
  loginLecturerSuccess,
  // logoutLecturer,
  setLecturerData,
} from "../actions/lecturers/lecturerActions";
import { connect } from "react-redux";
import { loginLecturer, loginStudent } from "../services/api";
import {
  fetchStudentFailure,
  fetchStudentRequest,
  fetchStudentSuccess,
  loginStudentSuccess,
  logoutStudent,
} from "../actions/students/studentActions";

const Login = ({
  userType,
  handleStudentLogin,
  handleLecturerLogin,
  lecturerErr,
  studentErr,
  isLoggedIn,
}) => {
  const navigate = useNavigate();
  const [referenceId, setReferenceId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [classCode, setClassCode] = useState("");
  const [signUp, setSignUp] = useState(false);

  const onSubmit = async () => {
    try {
      console.log(lecturerErr);
      if (userType == "student") {
        console.log(firstName, lastName, referenceId);
        if (!referenceId || !firstName || !lastName) {
          setError("Please fill in all fields");
          return;
        }
        await handleStudentLogin(referenceId, firstName, lastName, navigate);
        if (studentErr) {
          setError(studentErr);
          console.log(studentErr);
        }
      } else {
        if (!referenceId || !password) {
          setError("Please fill in all fields");
          return;
        }
        await handleLecturerLogin(referenceId, password, navigate);
        if (lecturerErr) {
          setError(lecturerErr);
        }
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userType == "lecturer") {
      navigate("/lecturer/dashboard/");
    }
  }, []);

  return (
    <div className="main">
      <div className="login-container">
        <form className="login-form">
          <h2>Login</h2>

          <label htmlFor="refernceId">Reference Id:</label>
          <input
            type="text"
            id="referenceId"
            value={referenceId}
            onChange={(e) => setReferenceId(e.target.value)}
            required
          />

          {userType === "student" && (
            <>
              <label htmlFor="firstname">First Name:</label>
              <input
                type="text"
                id="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              <label htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                id="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit(); // Invoke the onSubmit function
                }}>
                <span>Login</span>
              </button>
              {error && <p className="error-message">{error}</p>}
            </>
          )}

          {userType === "lecturer" && (
            <>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit(); // Invoke the onSubmit function
                }}>
                <span>Login</span>
              </button>
              {error && <p className="error-message">{error}</p>}
              <input type="checkbox" onClick={() => setSignUp(!signUp)} />
              <p>OR CREATE A NEW ACCOUNT</p>
            </>
          )}

          {userType === "lecturer" && signUp && (
            <button onClick={() => navigate("/register")}>
              <span>Sign UP</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userType: state.user,
    isLoggedIn: state.student.isLoggedIn
      ? state.student.isLoggedIn
      : state.lecturer.isLoggedIn,
    lecturerErr: state.lecturer.error,
    studentErr: state.student.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleStudentLogin: async (referenceId, firstname, lastname, navigate) => {
      try {
        dispatch(fetchStudentRequest());
        const user = await loginStudent(referenceId, firstname, lastname);
        dispatch(fetchStudentSuccess(user));
        dispatch(loginStudentSuccess());
        console.log("Logged in user:", user);
        navigate("/student");
      } catch (error) {
        dispatch(fetchStudentFailure(error.message));
        console.error("Login failed:", error.message);
        dispatch(logoutStudent());
      }
    },
    handleLecturerLogin: async (email, password, navigate) => {
      try {
        dispatch(fetchLecturerRequest());
        const user = await loginLecturer(email, password);
        dispatch(setLecturerData(user));
        dispatch(loginLecturerSuccess());
        navigate("/lecturer");
        console.log("Logged in user:", user);
      } catch (error) {
        dispatch(fetchLecturerFailure(error.message));
        console.error("Login failed:", error.message);
        // dispatch(logoutLecturer());
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
