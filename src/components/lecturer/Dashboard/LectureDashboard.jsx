import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../containers";

const LecturerDashboard = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Fetch classes data when the component mounts
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/classes`);
        const data = await response.json();
        // Assuming the response has a 'classes' property
        setClasses(data.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      <h2>Lecturer Dashboard</h2>
      <div>
        <h2 style={{ paddingBottom: 50 }}>Your Classes</h2>
        <ul className="dashboard-list">
          {classes.map((cls) => (
            <li className="login-form card" key={cls._id}>
              {cls.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LecturerDashboard;
