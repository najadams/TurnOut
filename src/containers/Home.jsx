import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContex";
import ScannerPage from "./ScannerPage";
import Header from '../components/common/Header/Header'
import Login from "./Login";

const Home = () => {

  return (
    <div>
      {/* <div className="main">
        <ScannerPage />
      </div> */}
      <Login />
    </div>
  );
};

export default Home;
