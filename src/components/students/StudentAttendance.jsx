import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../containers";

const StudentAttendance = () => {
  const { classId } = useParams();
  const studentInfo = useSelector((state) => state.student);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const studentId = studentInfo.data.user.studentId;
        const response = await axios.get(
          `${API_BASE_URL}/class/name/${classId}`
        );
        const name = response.data.class.name;
        setName(name);
        setLoading(false);
      } catch (error) {
        console.log("Something went wrong", error);
        setError(error);
      }
    };
    fetchName();
  }, [studentInfo.data.user.studentId]);

  return (
    <div>
      <h2 className="Page-name">Take Attendance</h2>
      <div>
        <h2>Class {name}</h2>
        <div className="main-content center">
          <div className="login-form">
            <h3>Attendance Status</h3>
            <h4>{name}</h4>
          </div>
        </div>
        {error && <h2 className="error-message">Something went wrong</h2>}
      </div>
    </div>
  );
};

export default StudentAttendance;
