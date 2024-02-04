import React from "react";
import { Route, Routes } from "react-router-dom";
import LectureDashboard from "../components/lecturer/LectureDashboard";
import LecturerClasses from "../components/lecturer/LecturerClasses";
import LecturerAttendance from "../components/lecturer/LecturerAttendance";

const LecturerRoutes = () => {
  return (
    <Routes>
      <Route index  element={<LectureDashboard />} />
      <Route path="/classes" element={<LecturerClasses />} />
      <Route path="/attendance" element={<LecturerAttendance />} />
    </Routes>
  );
};

export default LecturerRoutes;
