import React from "react";
import { useParams } from "react-router-dom";

const StudentAttendance = () => {
  const { classname } = useParams();
  return (
    <div>
      <h2 className="Page-name">Take Attendance</h2>
      <div>
        <h2>Class {classname}</h2>
        <div className="main-content flex-">

        </div>
        {/* {error && <h2 className="error-message">Something went wrong</h2>} */}
      </div>
    </div>
  );
};

export default StudentAttendance;
