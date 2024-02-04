import React, { useState } from "react";
import "./SideBar.css"; // Import the CSS file for styling

const SideBar = () => {
  // Use state to manage the sidebar and dark mode
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "open" : "close"} ${
        isDarkMode ? "dark" : ""
      }`}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src="logo.jpg" alt="" />
          </span>

          <div className="text header-text">
            <span className="name">Raven</span>
            <span className="profession">Developer</span>
          </div>
        </div>
        <i
          className={`toggle bx ${
            isSidebarOpen ? "bx-chevron-left" : "bx-chevron-right"
          }`}
          onClick={toggleSidebar}></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <i className="bx bx-search-alt icon"></i>
            <input
              type="search"
              className="search-box"
              placeholder="Search..."
            />
          </li>

          <ul className="menu-links">
            <li className="nav-link">
              <a href="#">
                <i className="bx bxs-home icon"></i>
                <span className="text nav-text">DashBoard</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bxs-bar-chart-alt-2 icon"></i>
                <span className="text nav-text">Revenue</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bxs-bell icon"></i>
                <span className="text nav-text">Notification</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bxs-pie-chart-alt-2 icon"></i>
                <span className="text nav-text">Analytics</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bxs-heart icon"></i>
                <span className="text nav-text">Likes</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className="bx bxs-wallet icon"></i>
                <span className="text nav-text">Wallet</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          <li>
            <a href="#">
              <i className="bx bx-log-out icon"></i>
              <span className="text nav-text">Logout</span>
            </a>
          </li>

          {/* <li className="mode" onClick={toggleDarkMode}>
            <div className="moon-sun">
              <i className="bx bx-moon icon moon"></i>
              <i className="bx bx-sun icon sun"></i>
            </div>
            <span className="mode-text text">Dark Mode</span>

            <div className="toggle-switch">
              <span className="switch"></span>
            </div>
          </li> */}
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
