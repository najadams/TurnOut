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
        setClasses(data.classes);
        console.log(data.classes);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      <h1>Lecturer Dashboard</h1>
      <div>
        <h2>Your Classes</h2>
        <ul>
          {classes.map((cls) => (
            <li key={cls.index}>{cls}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LecturerDashboard;
