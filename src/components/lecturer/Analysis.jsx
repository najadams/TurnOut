import React from "react";
import FilterBar from "../../containers/Filter/FilterBar";
import "./Analysis.css";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../../containers";
import axios from "axios";
import { useSelector } from "react-redux";
import AttendanceChart from "../common/AttendanceChart";

const Analysis = () => {
  const lecturerId = useSelector(
    (state) => state.lecturer.lecturerInfo.user._id
  );

  const fetchClassSummary = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/lecturer/${lecturerId}/summary`
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery(
    "classSummary",
    fetchClassSummary
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const numClasses = data.length;
  const numStudents = data.reduce((sum, item) => sum + item.studentCount, 0);
  const numAttendance = data.reduce(
    (sum, item) => sum + item.attendanceCount,
    0
  );

  return (
    <div className="main-analysis">
      <FilterBar />
      <div className="analysis">
        <div className="data card-content">
          <div>
            <h2>num_students :</h2> {numStudents}
          </div>
          <div>
            <h2>num_attendances :</h2> {numAttendance}
          </div>
          <div>
            <h2>num_classes : </h2>
            {numClasses}{" "}
          </div>
        </div>
        <div className="filter card-content">coco</div>
        <div className="summary card-content">
          <div className="info">
            <h2>summary</h2>
          </div>
          <div className="chart">
            {data ? (
              <AttendanceChart
                data={data}
                chartTitle={"Total classes you manage"}
              />
            ) : null}
            {console.log(data)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
