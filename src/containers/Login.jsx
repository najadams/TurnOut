import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router";
import { fetchLecturerFailure, fetchLecturerRequest, loginLecturerSuccess, logoutLecturer, setLecturerData } from "../actions/lecturers/lecturerActions";
import { connect } from "react-redux";
import { loginLecturer, loginStudent } from "../services/api";
import { fetchStudentFailure, fetchStudentRequest, fetchStudentSuccess, loginStudentSuccess, logoutStudent } from "../actions/students/studentActions";


const StudentLoginForm = ({
  onSubmit,
  onChange,
  // classCode,
  email,
  password,
  error,
}) => {
  return (
    <form className="login-form">
      <h2>Login</h2>

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => onChange("email", e.target.value)}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => onChange("password", e.target.value)}
        required
      />

      <button type="submit" onClick={onSubmit}>
        <span>Login</span>
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};
  
const LecturerLoginForm = ({
  onSubmit,
  onChange,
  email,
  password,
  error,
}) => {
  const navigate = useNavigate();
  return (
    <form className="login-form">
      <h2>Login</h2>

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => onChange("email", e.target.value)}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => onChange("password", e.target.value)}
        required
      />

      <div className="flex-items">
        <button type="submit" onClick={onSubmit}>
          Login
        </button>
        <button type="submit" onClick={() => navigate('/register')}>
          <span>Sign Up</span>
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

const Login = ({ userType, handleStudentLogin, handleLecturerLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    classCode: "",
  });
  const [error, setError] = useState("");

  const handleSLogin = async (e) => {
    e.preventDefault();
    try {
      const {email, password } = formData;
      await handleStudentLogin( email, password);
      // Handle other logic, e.g., redirect to a different page
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const handleLLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      await handleLecturerLogin(email, password);
      navigate('/lecturer/dashboard')
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    setError(""); // Clear any previous errors when userType changes
  }, [userType]);

  return (
    <div className="main">
      <div className="login-container">
        {userType === "student" ? (
          <StudentLoginForm
            onSubmit={handleSLogin}
            onChange={handleChange}
            classCode={formData.classCode}
            email={formData.email}
            password={formData.password}
            error={error}
          />
        ) : (
          <LecturerLoginForm
            onSubmit={handleLLogin}
            onChange={handleChange}
            email={formData.email}
            password={formData.password}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userType: state.user, 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleStudentLogin: async (email, password) => {
      try {
        dispatch(fetchStudentRequest())
        const user = await loginStudent(email, password);
        dispatch(fetchStudentSuccess(user))
        dispatch(loginStudentSuccess())
        console.log("Logged in user:", user);
      } catch (error) {
        console.error("Login failed:", error.message);
        dispatch(fetchStudentFailure(error))
        dispatch(logoutStudent())
      }
    },
    handleLecturerLogin: async (email, password) => {
      try {
        dispatch(fetchLecturerRequest())
        const user = await loginLecturer(email, password);
        dispatch(setLecturerData(user))
        dispatch(loginLecturerSuccess())
        // Now you can use the user data if needed
        console.log("Logged in user:", user);
      } catch (error) {
        console.error("Login failed:", error.message);
        dispatch(fetchLecturerFailure())
        dispatch(logoutLecturer())
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);