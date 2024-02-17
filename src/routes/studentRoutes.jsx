
import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentDashboard from "../components/students/StudentDashboard";
import StudentProfile from "../components/students/StudentProfile";
import StudentAttendance from "../components/students/StudentAttendance";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route index  element={<StudentDashboard />} />
      <Route path="/profile" element={<StudentProfile />} />
      <Route path="/class/:classname" element={<StudentAttendance />} />
    </Routes>
  );
};

export default StudentRoutes;
