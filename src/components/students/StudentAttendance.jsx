import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../containers";

const StudentAttendance = () => {
  const { classId } = useParams();
  const studentId = useSelector((state) => state.student.data.user._id);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [portalStatus, setPortalStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch class name
        const classResponse = await axios.get(
          `${API_BASE_URL}/class/name/${classId}`
        );
        const className = classResponse.data.class.name;
        setName(className);

        // Fetch portal status
        const portalResponse = await axios.get(
          `${API_BASE_URL}/api/classes/${classId}/portal-status`
        );
        const status = portalResponse.data.portalStatus;
        setPortalStatus(status === "open");

        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
        setError("Something went wrong");
      }
    };

    fetchData();
  }, [classId, studentId]);

  const handleAttendance = async (e) => {
    e.preventDefault();

    try {
      // Check if the portal is open before marking attendance
      if (portalStatus) {
        const response = await axios.get(`${API_BASE_URL}/api/classes/${classId}/check`, {
          studentId : studentId
        })
        // Check if the student has already marked attendance for the current day

          if (response.data.attendanceAlreadyMarked) {
            console.log("Attendance already marked for today");
            // Handle the case when attendance is already marked for today
          } else {
        // Send a POST request to mark attendance
        const markAttendanceResponse = await axios.post(
          `${API_BASE_URL}/mark`,
          {
            studentId: studentId,
            classId: classId,
            status: "Present",
          }
        );

        console.log(markAttendanceResponse.data); // Log the response if needed

        // Handle any further logic based on the response
        }
      } else {
        console.log("Attendance portal is not open");
        // Handle the case when the portal is not open, e.g., show a message to the user
      }
    } catch (error) {
      console.error("Error handling attendance:", error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2 className="Page-name">Take Attendance</h2>
      <div>
        <h2 style={{ paddingBottom: 50 }}>Class {name}</h2>
        <div className="main-content center">
          <div className="login-form">
            <h3 className="page-detail">Attendance Status</h3>
            <h4>
              {portalStatus ? (
                <div>
                  <div className="status attended">ONGOING</div>
                  <button type="submit" onClick={handleAttendance}>
                    <span>Take Attendance</span>
                  </button>
                </div>
              ) : (
                <div className="status missed">INACTIVE</div>
              )}
            </h4>
          </div>
        </div>
        {error && <h2 className="error-message">{error}</h2>}
      </div>
    </div>
  );
};

export default StudentAttendance;
