import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../containers";
import RenderTable from "./RenderTable";
import { useGeolocated } from "react-geolocated";
import { useSelector } from "react-redux";

const AttendanceDetails = () => {
  const lecturerId = useSelector(
    (state) => state.lecturer.lecturerInfo.user._id
  );
  const { classId } = useParams();
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState("");
  const [error, setError] = useState("");
  const [portalStatus, setPortalStatus] = useState(false);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 10000,
      watchPosition: true,
    });

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/class/name/${classId}`
        );
        const name = response.data.class.name;
        setClassName(name);
        setLoading(false);
      } catch (error) {
        console.log("Something went wrong", error);
        setError(error);
      }
    };
    fetchName();
  }, [classId]);

  const handleAttendanceMarking = async () => {
    try {
      // open portal for attendance marking
      if (!portalStatus) {
        const res = await axios.post(
          `${API_BASE_URL}/api/classes/${classId}/open-portal`,
          {
            lecturerId: lecturerId,
          }
        );
        console.log(res);
      } else {
        const res = await axios.post(
          `${API_BASE_URL}/api/classes/${classId}/close-portal`,
          { lecturerId: lecturerId }
        );
        console.log(res);
      }
      setPortalStatus((prevState) => !prevState);
      // Send location data and classId to the server
      // await axios.post(`${API_BASE_URL}/attendance/mark`, {
      //   classId: classId,
      //   latitude: coords.latitude,
      //   longitude: coords.longitude,
      // });
    } catch (error) {
      console.log("Error marking attendance", error);
      setError("Error marking attendance");
    }
  };

  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <div>
      <h2 className="Page-name">Mark Attendance </h2>
      <div>
        <h2>Start {className} attendance</h2>
        <button onClick={handleAttendanceMarking}>
          <span> {portalStatus ? "End" : "Start"}</span>
        </button>
        {error && <h2 className="error-message">Something went wrong</h2>}
      </div>
    </div>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
};

export default AttendanceDetails;
