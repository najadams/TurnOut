import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../containers";
import RenderTable from "./RenderTable";
import Loader from "../common/Loader/Loader";
import { useGeolocated } from "react-geolocated";

const AttendanceDetails = () => {
  const { classId } = useParams();
  const [loading, setLoading] = useState(true);
  const [className, setClassName] = useState("");
  const [error, setError] = useState("");
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
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
      // Send location data and classId to the server
      await axios.post(`${API_BASE_URL}/attendance/mark`, {
        classId: classId,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      // Handle success, maybe show a success message
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
          <span>Start</span>
        </button>   
        {error && <h2 className="error-message">Something went wrong</h2>}
      </div>
    </div>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
};

export default AttendanceDetails;
