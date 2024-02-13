import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../containers";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const LecturerDashboard = () => {
  const [classes, setClasses] = useState([]);
  const lecturerId = useSelector(
    (state) => state.lecturer.lecturerInfo.user._id
  );

  useEffect(() => {
    const fetchClasses = async (lecturerId) => {
      try {
        // Use axios to send a POST request with the lecturerId
        const response = await axios.post(`${API_BASE_URL}/classes`, {
          lecturerId,
        });
        // Access data directly from the response
        setClasses(response.data.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses(lecturerId);
  }, [lecturerId]);

  return (
    <div>
      <h2 className="Page-name">Lecturer Dashboard</h2>
      <div>
        <h2 style={{ paddingBottom: 50 }}>Your Classes</h2>
        <ul className="dashboard-list">
          {classes.map((cls) => (
            <Link
              style={{ textDecoration: "none" }}
              key={cls._id}
              to={`class/${cls._id}`}>
              <li className="login-form card">{cls.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LecturerDashboard;
