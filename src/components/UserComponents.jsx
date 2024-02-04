import React, { useEffect } from "react";
import { connect } from "react-redux";
import QRScanner from "./QRScanner";
import { fetchUserRequest, updateAttendance, sendUserDataRequest } from "../redux/actions/UserActions";

function UserComponent({
  user,
  loading,
  error,
  fetchUserRequest,
  updateAttendance,
}) {
  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserRequest();
  }, [fetchUserRequest]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div>
        <QRScanner />
      </div>
      <div>
        <h2>User Information</h2>
        {user && (
          <div>
            <p>Name: {user.name}</p>
            <p>Student ID: {user.student_id}</p>
            <p>Date of Birth: {user.date_of_birth}</p>
            <p>Absent: {user.isAbsent ? "Yes" : "No"}</p>
            <button
              onClick={() => updateAttendance(user.student_id, !user.isAbsent)}>
              Toggle Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.loading,
  error: state.user.error,
});

const mapDispatchToProps = {
  fetchUserRequest,
  updateAttendance,
  sendUserDataRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
