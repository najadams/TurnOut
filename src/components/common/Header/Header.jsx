import "./Header.css";
import React from "react";
import { connect } from "react-redux"; // If using Redux for state management

const Header = ({ isLoggedIn, userName }) => {
  return (
    <header className="header">
      <div className="left-section">
        <h1>TurnOut</h1>
      </div>

      <div className="right-section">
        {isLoggedIn && <h3>Welcome {userName.toUpperCase()}!</h3>}
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.student.isLoggedIn
    ? state.student.isLoggedIn
    : state.lecturer.isLoggedIn,
  // userName: state.student.data.userName, // Replace with actual state
  userName: state.student.isLoggedIn
    ? state.student.data.user.firstanem
    : state.lecturer.lecturerInfo.user.firstname,
});

export default connect(mapStateToProps)(Header);
