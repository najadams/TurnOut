import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../containers";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const studentInfo = useSelector((state) => state.student);
  useEffect(() => {
    const fetchName = async () => {
      try {
        const studentId = studentInfo.data.user.studentId;
        const response = await axios.get(
          `${API_BASE_URL}/student/${studentId}/classes`
        );
        const name = response.data;
        setClasses(name.classNames);
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
      <h2 className="Page-name">Student Dashboard</h2>
      <div>
        <h2 style={{ paddingBottom: 50 }}>Your Classes</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 100,
          }}>
          <ul className="dashboard-list">
            {classes.map((cls, index) => (
              <Link
                style={{ textDecoration: "none" }}
                key={index}
                to={`class/${cls}`}>
                <li className="login-form card">{cls}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
