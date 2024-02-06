import React from "react";
import { Route, Routes } from "react-router-dom";
import LectureDashboard from "../components/lecturer/Dashboard/LectureDashboard";
import LecturerClasses from "../components/lecturer/LecturerClasses";
import LecturerAttendance from "../components/lecturer/LecturerAttendance";
import SideBar from "../components/lecturer/Dashboard/SideBar";

const LecturerRoutes = () => {
  return (
    <div className="dashboard">
      <SideBar />
      <div className="main-content">
        <Routes>
          <Route index element={<LectureDashboard />} />
          <Route path="/classes" element={<LecturerClasses />} />
          <Route path="/attendance" element={<LecturerAttendance />} />
        </Routes>
      </div>
    </div>
  );
};

export default LecturerRoutes;
