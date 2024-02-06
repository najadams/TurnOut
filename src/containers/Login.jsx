import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router";
import {
  fetchLecturerFailure,
  fetchLecturerRequest,
  loginLecturerSuccess,
  logoutLecturer,
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
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signUp, setSignUp] = useState(false);

  const onSubmit = async () => {
    try {
      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }

      console.log(lecturerErr);
      if (userType == "student") {
        await handleStudentLogin(email, password, navigate);
        if (studentErr) {
          setError(studentErr);
          console.log(studentErr);
        }
      } else {
        await handleLecturerLogin(email, password, navigate);
        if (lecturerErr) {
          setError(lecturerErr);
          console.log(lecturerErr);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="login-container">
        <form className="login-form">
          <h2>Login</h2>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

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
          {userType == "lecturer" && (
            <>
              <input type="checkbox" onClick={() => setSignUp(!signUp)} />
              <p>OR CREATE A NEW ACCOUNT</p>
            </>
          )}

          {userType == "lecturer" && signUp && (
            <button onClick={() => navigate('/register')}>
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
    lecturerErr: state.lecturer.error,
    studentErr: state.student.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleStudentLogin: async (email, password, navigate) => {
      try {
        dispatch(fetchStudentRequest());
        const user = await loginStudent(email, password);
        dispatch(fetchStudentSuccess(user));
        dispatch(loginStudentSuccess());
        console.log("Logged in user:", user);
        navigate("/student");
      } catch (error) {
        console.error("Login failed:", error.message);
        dispatch(fetchStudentFailure(error.message));
        // dispatch(logoutStudent());
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
        // dispatch(logoutLecturer());
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
