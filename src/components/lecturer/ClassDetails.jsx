// ClassDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../containers";
import axios from "axios";

const ClassDetails = () => {
  const { classId } = useParams();
  const [classDetails, setClassDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(classId);
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/class/${classId}`);
        setClassDetails(response.data); // Access response.data to get the actual data
      } catch (error) {
        console.log(error.message);
        setError("Something went wrong");
      }
    };
    fetchClassDetails();
  }, [classId]);
  return (
    <div>
      <h2 className="Page-name">Lecturer Dashboard</h2>
      <div>
        <h2>Class Details</h2>
        {classDetails && (
          <div>
            <p>Class Name: {classDetails.name}</p>
            {/* Add more details as needed */}
          </div>
        )}
        {error && <h2 className="error-message ">Something went wrong</h2>}
      </div>
    </div>
  );
};

export default ClassDetails;
