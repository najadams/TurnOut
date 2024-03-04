import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../containers";
import { useGeolocated } from "react-geolocated";
import { useSelector } from "react-redux";
import Loader from "../common/Loader/Loader";
import RenderTable from "./RenderTable";

const AttendanceDetails = () => {
  const referenceId = useSelector(
    (state) => state.lecturer.lecturerInfo.user.referenceId
  );
  const lecturerId = useSelector(
    (state) => state.lecturer.lecturerInfo.user._id
  );
  const { classId } = useParams();
  const prevCoords = useRef(null);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState();
  const [className, setClassName] = useState("");
  const [error, setError] = useState("");
  const [portalStatus, setPortalStatus] = useState(false);
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: true },
      userDecisionTimeout: 10000,
      watchPosition: true,
    });

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        setLoading(true);
        const nameResponse = await axios.get(
          `${API_BASE_URL}/class/name/${classId}`
        );
        const name = nameResponse.data.class.name;
        setClassName(name);

        const statusResponse = await axios.get(
          `${API_BASE_URL}/api/classes/${classId}/portal-status`
        );
        setPortalStatus(statusResponse.data.portalStatus === "open");

        setLoading(false);
      } catch (error) {
        console.error("Error fetching class details", error);
        setError("Error fetching class details");
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [classId]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await axios.get(
          `${API_BASE_URL}/attendance/${classId}/${formattedDate}`
        );
        console.log(data.data);
        setStudents(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    let intervalId;

    if (portalStatus) {
      intervalId = setInterval(() => {
        // Send location only if there's a change in coords
        //  if (
        //    coords &&
        //    (!prevCoords.current ||
        //      coords.latitude !== prevCoords.current.latitude ||
        //      coords.longitude !== prevCoords.current.longitude)
        //  ) {
        sendLocation();
        getStudents();
        //  prevCoords.current = coords; // Update previous coords
        //  }
      }, 10000);
    }

    return () => {
      // Clear the interval when the component unmounts
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [portalStatus, coords, referenceId, students]);

  const sendLocation = async () => {
    if (portalStatus && coords) {
      await axios.post(`${API_BASE_URL}/lecturer/location`, {
        referenceId: referenceId,
        longitude: coords.longitude,
        latitude: coords.latitude,
      });
    }
  };

  const handleAttendanceMarking = async () => {
    try {
      setLoading(true);
      const portalEndpoint = portalStatus
        ? `${API_BASE_URL}/api/classes/${classId}/close-portal`
        : `${API_BASE_URL}/api/classes/${classId}/open-portal`;

      await axios.post(portalEndpoint, { lecturerId });
      sendLocation();
      setLoading(false);
      setPortalStatus((prevState) => !prevState);
    } catch (error) {
      console.error("Error marking attendance", error);
      setError("Error marking attendance");
      setLoading(false);
    }
  };

  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Please check your Network and try again</div>
  ) : coords ? (
    <div>
      <h2 className="Page-name">Mark Attendance</h2>
      <div>
        {!portalStatus ? <h1>Start</h1> : <h1>End</h1>}
        <h2>{className} attendance</h2>
        {loading ? (
          <div style={{ width: "100%", height: "100%" }}>
            <Loader />
          </div>
        ) : (
          <div>
            <button onClick={handleAttendanceMarking}>
              <span> {!portalStatus ? "Start" : "End"}</span>
            </button>

            {students && portalStatus && (
              <div>
                <RenderTable data={students} tableName={"Present Students"} />
              </div>
            )}
          </div>
        )}
        {error && <h2 className="error-message">{error}</h2>}
      </div>
    </div>
  ) : (
    <div className="center " style={{ height: "100%" }}>
      <div>
        <Loader />
      </div>
      <div>Getting the location data&hellip;</div>
    </div>
  );
};

export default AttendanceDetails;
