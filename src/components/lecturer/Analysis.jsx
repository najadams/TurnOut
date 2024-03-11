import React from "react";
import FilterBar from "../../containers/Filter/FilterBar";
import "./Analysis.css";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../../containers";

const Analysis = () => {
  const fetchClasses = async () => {
    const response = axios.get(`${API_BASE_URL}/lecturer/classes`);
    return response.data;
  }
  return (
    <div>
      <FilterBar />
      <div className="analysis">
        {/* <h2>hello</h2> */}
        <div className="num_students card-content">num_students</div>
        <div className="num_attendances card-content">num_attendances</div>
        <div className="num_classes card-content">num_classes</div>
        <div className="summary card-content">summary</div>
      </div>
    </div>
  );
};

export default Analysis;
