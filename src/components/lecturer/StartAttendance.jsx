import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../containers";
import RenderTable from "./RenderTable";
import { useGeolocated } from "react-geolocated";
import { useSelector } from "react-redux";
import Welcome from "./Welcome";
import Loader from "../common/Loader/Loader";

const AttendanceDetails = () => {
  const lecturerId = useSelector(
    (state) => state.lecturer.lecturerInfo.user._id
  );
  const { classId } = useParams();
  const [loading, setLoading] = useState(false);
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
        const status = await axios.get(
          `${API_BASE_URL}/api/classes/${classId}/portal-status`
        );
        console.log(status.data.portalStatus);
        setPortalStatus(status.data.portalStatus === "open");
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
      // Open or close portal for attendance marking
      setLoading(true);
      console.log(portalStatus);
      const portalEndpoint = portalStatus
        ? `${API_BASE_URL}/api/classes/${classId}/close-portal`
        : `${API_BASE_URL}/api/classes/${classId}/open-portal`;
      const coco = await axios.post(portalEndpoint, { lecturerId: lecturerId });
      if (portalStatus) {
        setInterval(async () => {
          // If opening the portal, send the lecturer's location to the server
          if (!portalStatus && coords) {
            await axios.post(`${API_BASE_URL}/lecturer/location`, {
              lecturerId: lecturerId,
              longitude: coords.longitude,
              latitude: coords.latitude,
            });
          }
        }, 15000); // Send location every 15 seconds
      }
      setLoading(false);
      setPortalStatus((prevState) => !prevState);
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
        {!portalStatus ? <h1>Start</h1> : <h1>End</h1>}{" "}
        <h2>{className} attendance</h2>
        {loading ? (
          <div style={{ width: "100%", height: "100%" }}>
            <Loader />
          </div>
        ) : (
          <button onClick={handleAttendanceMarking}>
            <span> {!portalStatus ? "Start" : "End"}</span>
          </button>
        )}
        {error && <h2 className="error-message">Something went wrong</h2>}
      </div>
    </div>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
};

export default AttendanceDetails;
