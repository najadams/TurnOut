import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import RenderTable from "../RenderTable";

const LectureDashboard = ({ isLoggedIn }) => {

  console.log(isLoggedIn);
  return <RenderTable />;
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.lecturer.isLoggedIn,
  };
};

export default connect(mapStateToProps)(LectureDashboard);
