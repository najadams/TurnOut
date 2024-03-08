import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_BASE_URL, Dlimit } from "../../containers";
import { useGeolocated } from "react-geolocated";
import getDistance from "geolib/es/getPreciseDistance";
import { useQuery } from "react-query";

const StudentAttendance = () => {
  const { classId } = useParams();
  const studentId = useSelector((state) => state.student.data.user._id);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState(false);
  const [location, setLocation] = useState();
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: true },
      userDecisionTimeout: 10000,
      watchPosition: true,
    });

  const {
    data: portalStatusData,
    isLoading: portalStatusLoading,
    error: portalStatusError,
  } = useQuery(["portalStatus", classId], async () => {
    const response = await axios.get(
      `${API_BASE_URL}/api/classes/${classId}/portal-status`
    );
    return response.data.portalStatus === "open";
  });

  const {
    data: classNameData,
    isLoading: classNameLoading,
    error: classNameError,
  } = useQuery(["className", classId], async () => {
    const response = await axios.get(`${API_BASE_URL}/class/name/${classId}`);
    return response.data.class.name;
  });

  const {
    data: lecturerLocationData,
    isLoading: lecturerLocationLoading,
    error: lecturerLocationError,
  } = useQuery(["lecturerLocation", classId], async () => {
    const response = await axios.get(
      `${API_BASE_URL}/lecturer/location/${classId}`
    );
    return response.data.location;
  });

  useEffect(() => {
    if (classNameData) {
      setName(classNameData);
    }
  }, [classNameData]);

  useEffect(() => {
    const fetchAttendanceStatus = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/classes/${classId}/check`,
          {
            studentId: studentId,
          }
        );

        if (response.data.attendanceMarked) {
          setAttendanceStatus(true);
        }
      } catch (error) {
        console.error("Error fetching attendance status:", error);
        setError("Error fetching attendance status");
      }
    };

    fetchAttendanceStatus();
  }, [classId, studentId]);

  const calcDistance = (point1, point2) => {
    if (point1 && point2) {
      const distance = getDistance(point1, point2);
      return distance < Number(`${Dlimit}`);
    } else {
      console.error("One or both coordinates are undefined");
      return false;
    }
  };

  const handleAttendance = async (e) => {
    e.preventDefault();

    try {
      const studentLocation = {
        longitude: coords.longitude,
        latitude: coords.latitude,
      };

      const closedToLecturer = calcDistance(location, studentLocation);

      const markAttendanceResponse = await axios.post(`${API_BASE_URL}/mark`, {
        studentId: studentId,
        classId: classId,
        status: "Present",
      });

      console.log(markAttendanceResponse.data);
      setAttendanceStatus(true)
      // Handle any further logic based on the response
    } catch (error) {
      console.error("Error handling attendance:", error);
      setError("Error handling attendance");
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
              {portalStatusData && lecturerLocationData ? (
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
