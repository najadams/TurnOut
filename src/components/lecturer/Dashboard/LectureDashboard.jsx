import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import RenderTable from "../RenderTable";

const LectureDashboard = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });
  console.log(isLoggedIn);
  return (
    <div className="dashboard">
      <SideBar />
      <div className="main-content">
        <RenderTable />
      </div>
    </div>
  );
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     setUserType: (user) => dispatch(setUserType(user)),
//   };
// };

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.lecturer.isLoggedIn,
  };
};

export default connect(mapStateToProps)(LectureDashboard);
