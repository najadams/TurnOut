import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LectureDashboard from "../components/lecturer/Dashboard/LectureDashboard";
import LecturerClasses from "../components/lecturer/LecturerClasses";
import LecturerAttendance from "../components/lecturer/LecturerAttendance";
import SideBar from "../components/lecturer/Dashboard/SideBar";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExcelUploader from "../components/lecturer/ExcelUploader";
import ClassDetails from "../components/lecturer/ClassDetails";

const LecturerRoutes = ({ userType, isLoggedIn }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (userType == "student" || !isLoggedIn) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="dashboard">
      <SideBar />
      <div className="main-content">
        <Routes>
          <Route exact element={<LectureDashboard />} />
          <Route index path="/dashboard" element={<LectureDashboard />} />
          <Route path="/classes" element={<LecturerClasses />} />
          <Route path="/attendance" element={<LecturerAttendance />} />
          <Route path="/createClass" element={<ExcelUploader />} />
          <Route path="/dashboard/class/:classId" element={<ClassDetails />} />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userType: state.user.userType,
    isLoggedIn: state.lecturer.isLoggedIn,
  };
};

export default connect(mapStateToProps)(LecturerRoutes);
