import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_BASE, API_BASE_URL, Dlimit } from "../../containers";
import { useGeolocated } from "react-geolocated";
import getDistance from "geolib/es/getPreciseDistance";

const StudentAttendance = () => {
  const { classId } = useParams();
  const studentId = useSelector((state) => state.student.data.user._id);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [portalStatus, setPortalStatus] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState(false);
  const [lecctureId, setLecturerId] = useState();
  const [location, setLocation] = useState();
  const [socket, setSocket] = useState(null);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: true },
      userDecisionTimeout: 10000,
      watchPosition: true,
    });

  // Fetch name of class and portal status for attendance
  useEffect(() => {
    const fetchName = async () => {
      const classResponse = await axios.get(
        `${API_BASE_URL}/class/name/${classId}`
      );
      const className = classResponse.data.class.name;
      setName(className);
      const response = await axios.post(
        `${API_BASE_URL}/api/classes/${classId}/check`,
        { studentId: studentId }
      );
      console.log(response.data.attendanceMarked);
      console.log("let ther be a check");

      // Check if the student has already marked attendance for the current day
      if (response.data.attendanceMarked) {
        console.log("Attendance Taken");
        setAttendanceStatus(true);
      }
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

  // second useEffect to establish websocket connection
  // useEffect(() => {
  //   const ws = new WebSocket(`ws://${API_BASE}`);

  //   ws.onopen = () => {
  //     console.log("Connected to the server");
  //     // const intervalId = setInterval(() => {
  //     //   if (location) {
  //     //     console.log(location);
  //     //   } else {
  //     //     console.log("Location is undefined");
  //     //   }
  //     // }, 5000);

  //     // return () => clearInterval(intervalId);
  //   };

  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     setLocation(data);
  //     // console.log(data);
  //     ws.close();
  //   };

  //   ws.onclose = () => {
  //     console.log("WebSocket connection closed");
  //   };

  //   setSocket(ws);

  //   // Check if the portal is open before marking attendance

  //   checkAttendanceStatus();
  // }, [portalStatus]);

  useEffect(() => {
    const getLecturerLocation = async () => {
      const lecturerLocation = await axios.get(
        `${API_BASE_URL}/lecturer/location/${classId}`
      );
      // console.log(lecturerLocation.data.location);
      // console.log(studentLocation);
      console.log("first");
      setLocation(lecturerLocation.data.location);
    };

    const interval = setInterval(() => {
      // console.log(location);
      getLecturerLocation();
    }, 5000);

    return () => clearInterval(interval);
  }, [location]);

  const calcDistance = (point1, point2) => {
    if (point1 && point2) {
      const distance = getDistance(point1, point2);
      return distance < Number(`${Dlimit}`) ? true : false;
    } else {
      console.error("One or both coordinates are undefined");
    }
  };
  const handleAttendance = async (e) => {
    e.preventDefault();

    try {
      const studentLocation = {
        longitude: coords.longitude,
        latitude: coords.latitude,
      };
      const closedtoLecturer = calcDistance(location, studentLocation);
      // console.log(closedtoLecturer);
      // Send a POST request to mark attendance
      const markAttendanceResponse = await axios.post(`${API_BASE_URL}/mark`, {
        studentId: studentId,
        classId: classId,
        status: "Present",
      });

      console.log(markAttendanceResponse.data); // Log the response if needed

      // Handle any further logic based on the response
    } catch (error) {
      console.error("Error handling attendance:", error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Please check your Network and try again</div>
  ) : coords ? (
    <div>
      <h2 className="Page-name">Take Attendance</h2>
      <div>
        <h2 style={{ paddingBottom: 50 }}>Class {name}</h2>
        <div className="main-content center">
          <div className="login-form">
            <h3 className="page-detail">Attendance Status</h3>
            <h4>
              {portalStatus && location ? (
                <div>
                  <div className="status attended">ONGOING</div>
                  {attendanceStatus ? (
                    <h4 style={{ paddingTop: 50 }}>Attendance marked</h4>
                  ) : (
                    <button type="submit" onClick={handleAttendance}>
                      <span>Take Attendance</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="status missed">INACTIVE</div>
              )}
              {location && (
                <div>
                  <p>lect: {location.longitude}</p>
                  <p>Latitude: {location.latitude}</p>
                  <p>student: {coords.longitude}</p>
                  <p>Latitude: {coords.latitude}</p>
                </div>
              )}
            </h4>
          </div>
        </div>
        {error && <h2 className="error-message">{error}</h2>}
      </div>
    </div>
  ) : (
    <div>Getting the location data&hellip;</div>
  );
};

export default StudentAttendance;
