import "./Header.css";
import React from "react";
import { connect } from "react-redux"; // If using Redux for state management

const Header = ({ isLoggedIn, userName }) => {
  return (
    <header className="header">
      <div className="left-section">
        <h1>TurnOut</h1>
      </div>

      {/* <div className="right-section">
        {isLoggedIn ? (
          <span>Welcome, {userName}!</span>
        ) : (
          <div className="details">
            <a href="/signin">
              <button>
                <span>Sign In</span>
              </button>
            </a>
            <a href="/signup">
              <button>Sign Up</button>
            </a>
          </div>
        )}
      </div> */}
    </header>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.student.isLoggedIn, 
  // userName: state.student.data.userName, // Replace with actual state
  userName : 'naj'
});

export default connect(mapStateToProps)(Header);
