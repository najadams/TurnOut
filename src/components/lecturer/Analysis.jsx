import React, { useState, useEffect } from "react";
import FilterBar from "../../containers/Filter/FilterBar";
import "./Analysis.css";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../../containers";
import axios from "axios";
import { useSelector } from "react-redux";
import AttendanceChart from "../common/AttendanceChart";
import RenderTable from "../common/RenderTable";

const Analysis = () => {
  const lecturerId = useSelector(
    (state) => state.lecturer.lecturerInfo.user._id
  );
  const [classes, setClasses] = useState([]);
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  // call back function needed to pass data from <Filter />
  const [chartData, setChartData] = useState(null);
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

  useEffect(() => {
    if (data) {
      const listOfClasses = data.map((coco) => coco.className);
      setClasses(listOfClasses);
    }
  }, [data]);

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const numClasses = data.length;
  const listOfClasses = data.map((coco) => coco.className);
  const numStudents = data.reduce((sum, item) => sum + item.studentCount, 0);
  const numAttendance = data.reduce(
    (sum, item) => sum + item.attendanceCount,
    0
  );

  return (
    <div className="main-analysis">
      <FilterBar
        classNames={classes}
        setChartData={setChartData}
        setFormSubmitted={setFormSubmitted}
      />
      <div className="analysis">
        <div className="data card-content">
          <div>
            <h3>num_students :</h3> {numStudents}
          </div>
          <div>
            <h3>num_attendances :</h3> {numAttendance}
          </div>
          <div>
            <h3>num_classes : </h3>
            {numClasses}{" "}
          </div>
        </div>
        <div className="filter card-content">coco</div>
        <div className="summary card-content">
          <div className="info">
            <h2>summary</h2>
          </div>
          <div className="chart">
            {!isFormSubmitted && data ? (
              <AttendanceChart
                data={data}
                chartTitle={"Total classes you manage"}
              />
            ) : (
              <div style={{ width: 500 }} className="table">
                <RenderTable
                  data={chartData}
                  tableName={"Students In Trouble"}
                  loadingState={"Loading"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
