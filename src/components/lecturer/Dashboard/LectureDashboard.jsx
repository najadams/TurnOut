import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../containers";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Welcome from "../Welcome";

const LecturerDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false); // dont forget to change
  const lecturerId = useSelector(
    (state) => state.lecturer.lecturerInfo.user._id
  );

  useEffect(() => {
    const fetchClasses = async (lecturerId) => {
      try {
        // Use axios to send a POST request with the lecturerId
        const response = await axios.post(`${API_BASE_URL}/lecturer/classes`, {
          lecturerId,
        });
        // Access data directly from the response
        setClasses(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses(lecturerId);
  }, [lecturerId]);
  if (loading) {
    return (
      <div style={{ height: "88vh" }}>
        <Welcome />
      </div>
    );
  }

  return (
    <div>
      <h2 className="Page-name">Lecturer Dashboard</h2>
      <div>
        <h2 className="page-detail">Your Classes</h2>
        <div className="dashboard center">
          <ul className="dashboard-list" style={{ width: "90%" }}>
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
    </div>
  );
};

export default LecturerDashboard;
