// ClassDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../containers";

const ClassDetails = () => {
  const { classId } = useParams();
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/class/${classId}`);
        const data = await response.json();
        setClassDetails(data);
      } catch (error) {
        console.error("Error fetching class details:", error);
      }
    };

    fetchClassDetails();
  }, [classId]);

  return (
    <div>
      <h2>Class Details</h2>
      {classDetails && (
        <div>
          <p>Class Name: {classDetails.name}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default ClassDetails;
