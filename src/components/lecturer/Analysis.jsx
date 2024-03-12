import React, { useEffect } from "react";
import FilterBar from "../../containers/Filter/FilterBar";
import "./Analysis.css";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../../containers";
import axios from "axios";
import { useSelector } from "react-redux";

const Analysis = () => {
  const lecturerId = useSelector(
    (state) => state.lecturer.lecturerInfo.user._id
  );

  useEffect(() => {
    const fetchClasses = async (lecturerId) => {
      try {
        // Use axios to send a POST request with the lecturerId
        const response = await axios.post(`${API_BASE_URL}/lecturer/classes`, {
          lecturerId,
        });
        // Access data directly from the response
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses(lecturerId);
  }, [lecturerId]);

  // const { data: numClasses } = useQuery(["NumClasses"]);
  return (
    <div className="main-analysis">
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
