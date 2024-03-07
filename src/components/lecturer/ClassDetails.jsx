// ClassDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../containers";
import RenderTable from "./RenderTable";
import Loader from "../common/Loader/Loader";

const ClassDetails = () => {
  const { classId } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/class/${classId}`);
        const responseData = response.data.data;

        setDetails(responseData);
        setStudents(responseData.students);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setError("Something went wrong");
      }
    };

    fetchClassDetails();
  }, [classId]);

  if (loading) {
    return (
      <div
        style={{
          height: "88vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <h2 className="Page-name">Lecturer Dashboard</h2>
      <div>
        <h2>Class</h2>
        {details && (
          <div>
            <RenderTable data={students} tableName={details.name} />
          </div>
        )}
        {error && <h2 className="error-message">Something went wrong</h2>}
      </div>
    </div>
  );
};

export default ClassDetails;
