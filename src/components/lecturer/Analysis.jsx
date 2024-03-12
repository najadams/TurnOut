import React, { useEffect, useState } from "react";
import FilterBar from "../../containers/Filter/FilterBar";
import "./Analysis.css";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../../containers";
import axios from "axios";
import { useSelector } from "react-redux";

const Analysis = () => {
  const [numClasses, setNumClasses] = useState(0);
  const [numStudents, setNumStudents] = useState(0);
  const [numAttendance, setNumAttendance] = useState(0);
  const lecturerId = useSelector(
    (state) => state.lecturer.lecturerInfo.user._id
  );

  useEffect(() => {
    const fetchClassSummary = async (lecturerId) => {
      try {
        // Use axios to send a POST request with the lecturerId
        const response = await axios.get(
          `${API_BASE_URL}/lecturer/${lecturerId}/summary`
        );
        setNumClasses(response.data.length);
        const classNames = response.data.map((coco) => coco.className);
        const totaStudents = response.data.reduce(
          (sum, coco) => sum + coco.studentCount,
          0
        );
        const totalAttendance = response.data.reduce(
          (sum, coco) => sum + coco.attendanceCount,
          0
        );
        setNumAttendance(totalAttendance);
        setNumStudents(totaStudents);
        console.log(totaStudents);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClassSummary(lecturerId);
  }, [lecturerId]);

  // const { data: numClasses } = useQuery(["NumClasses"]);
  return (
    <div className="main-analysis">
      <FilterBar />
      <div className="analysis">
        {/* <h2>hello</h2> */}
        <div className="num_students card-content">
          num_students : {numStudents}
        </div>
        <div className="num_attendances card-content">
          num_attendances : {numAttendance}
        </div>
        <div className="num_classes card-content">
          num_classes : {numClasses}{" "}
        </div>
        <div className="summary card-content">summary</div>
      </div>
    </div>
  );
};

export default Analysis;
