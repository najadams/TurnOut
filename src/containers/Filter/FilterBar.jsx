import React, { useState } from "react";
import "./FilterBar.css";

const FilterBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="Filter">
      <button onClick={toggleNav} className="toggle-button">
        <h1 style={{ fontFamily: "monospace" }}>Filters...</h1>
        <h1>☰</h1>
      </button>

      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
        {/* Add more links as needed */}
      </nav>
    </div>
  );
};

export default FilterBar;
