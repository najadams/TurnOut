import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_BASE, API_BASE_URL } from "../../containers";

const StudentAttendance = () => {
  const { classId } = useParams();
  const studentId = useSelector((state) => state.student.data.user._id);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [portalStatus, setPortalStatus] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState(false);
  const [location, setLocation] = useState({});
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Fetch name of class and portal status for attendance
    const fetchName = async () => {
      const classResponse = await axios.get(
        `${API_BASE_URL}/class/name/${classId}`
      );
      const className = classResponse.data.class.name;
      setName(className);
    };
    const fetchData = async () => {
      try {
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

    // Set up interval to check portal status every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Fetch data initially when the component mounts
    fetchName();
    fetchData();

    // Clean up interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, [classId, studentId]);

  // second useEffect to get the location of the lecturer
  useEffect(() => {
    // testing websocket connection
    const ws = new WebSocket(`ws://${API_BASE}`);

    // check for ws connection with server
    ws.onopen = () => {
      console.log("Connected to the server");
    };

    ws.onmessage = (event) => {
      const data = event.data;
      console.log(data);
      setLocation(data);
    };

    ws.onclose = () => {
      console.log("coco");
    };

    setSocket(ws);

    // end of websocket snippet0
  }, [location]);

  const handleAttendance = async (e) => {
    e.preventDefault();

    try {
      // Check if the portal is open before marking attendance
      if (portalStatus) {
        // Get data to check if the attendance has been marked
        const response = await axios.post(
          `${API_BASE_URL}/api/classes/${classId}/check`,
          { studentId: studentId }
        );
        console.log(response.data.attendanceMarked);

        // Check if the student has already marked attendance for the current day
        if (response.data.attendanceMarked) {
          console.log("Attendance Taken");
          setAttendanceStatus(true);
          // Here you can add the WebSocket logic to receive location data
        } else {
          // establish websocket connection to get the lecturers location

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
                  {attendanceStatus ? (
                    <button type="submit" onClick={handleAttendance}>
                      <span>Take Attendance</span>
                    </button>
                  ) : (
                    <h4 style={{ paddingTop: 50 }}>
                      Attendance marked already
                    </h4>
                  )}
                </div>
              ) : (
                <div className="status missed">INACTIVE</div>
              )}
              {location && <div>longitude : {location["longitude"]}</div>}
            </h4>
          </div>
        </div>
        {error && <h2 className="error-message">{error}</h2>}
      </div>
    </div>
  );
};

export default StudentAttendance;
