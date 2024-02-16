import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../containers";
import RenderTable from "./RenderTable";
import Loader from "../common/Loader/Loader";
const AttendanceDetails = () => {
  const { classId } = useParams();
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/class/name/${classId}`
        );
        const name = response.data.class.name;
        setClassName(name);
        setLoading(false);
        console.log(name);
      } catch (error) {
        console.log("Something went wrong", error);
        setError(error);
      }
    };
    fetchName();
  }, [classId]);

  // if (loading) {
  //   return (
  //     <div style={{ height: "88vh" }}>
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <div>
      <h2 className="Page-name">Mark Attendance </h2>
      <div>
        <h2>Start {className} attendance</h2>
        <button>
          <span>Start</span>
        </button>
        {error && <h2 className="error-message">Something went wrong</h2>}
      </div>
    </div>
  );
};

export default AttendanceDetails;
