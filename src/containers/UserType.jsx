import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setUserType } from "../reducers/userReducer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserType = ({ setUserType, userType, isLoggedIn }) => {
  const navigate = useNavigate();

  const setLecturer = () => {
    setUserType("lecturer");
    navigate("/login");
  };
  const setStudent = () => {
    setUserType("student");
    navigate("/login");
  };
  useEffect(() => {
    if (isLoggedIn && userType == "student") {
      navigate("/student/dashboard");
    }
    if (isLoggedIn && userType == "lecturer") {
      navigate("/lecturer/dashboard");
    }
  }, []);
  return (
    <div className="main">
      <div className="login-container">
        <div className="login-form">
          <h2>Select Your role</h2>
          <div className="flex-items">
            <button onClick={setStudent}>
              <span>Student</span>
            </button>
            <button onClick={setLecturer}>
              <span>Lecturer</span>
            </button>
          </div>
        </div>
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
    setUserType: (user) => dispatch(setUserType(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserType);
