import React from "react";
import FilterBar from "../../containers/Filter/FilterBar";
import "./Analysis.css";

const Analysis = () => {
  return (
    <div style={{ height: "50%" }}>
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
