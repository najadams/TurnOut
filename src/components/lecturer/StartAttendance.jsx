import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../containers";
import RenderTable from "./RenderTable";
import Welcome from "./Welcome";
const AttendanceDetails = () => {
  const { classId } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  //   if (loading) {
  //     return (
  //       <div style={{ height: "88vh" }}>
  //         <Welcome />
  //       </div>
  //     );
  //   }

  return (
    <div>
      <h2 className="Page-name">Mark Attendance </h2>
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

export default AttendanceDetails;
