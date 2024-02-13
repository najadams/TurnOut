// ClassDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../containers";
import axios from "axios";

const ClassDetails = () => {
  const { classId } = useParams();
  const [details, setDetails] = useState(null);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/class/${classId}`);
        const response = res.data;
        console.log(response);
        setDetails(response.data);
      } catch (error) {
        console.log(error.message);
        setError("Something went wrong");
      }
    };
    fetchClassDetails();
  }, [classId]);

  useEffect(() => {
    console.log(details);
    setStudents(details.students);
    console.log(students);
  }, [details]);
  return (
    <div>
      <h2 className="Page-name">Lecturer Dashboard</h2>
      <div>
        <h2>Class Details</h2>
        {details && (
          <div>
            <p>Class Name: {details.name}</p>
            {/* Add more details as needed */}
          </div>
        )}
        {error && <h2 className="error-message ">Something went wrong</h2>}
      </div>
    </div>
  );
};

export default ClassDetails;
