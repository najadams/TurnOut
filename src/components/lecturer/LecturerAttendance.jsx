import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../containers";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../common/Loader/Loader";

const LecturerAttendance = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
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
      <div className="center " style={{ height: "100%" }}>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <h2 className="Page-name">Take Attendance</h2>
      <div>
        <h2 style={{ paddingBottom: 50 }}>Your Classes</h2>
        <div className="dashboard center">
          <ul className="dashboard-list" style={{ width: "90%" }}>
            {classes.map((cls) => (
              <Link
                style={{ textDecoration: "none" }}
                key={cls._id}
                to={`${cls._id}`}>
                <li className="login-form card">{cls.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LecturerAttendance;
