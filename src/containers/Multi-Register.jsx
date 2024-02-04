import React, { useState } from "react";
import "./Register.css"; // Import the CSS file for styling
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { registerUser } from "../services/api";

const StudentRegisterForm = ({
  onSubmit,
  onChange,
  firstname,
  lastname,
  studentId,
  indexNumber,
  email,
  password,
  confirmPassword,
  error,
}) => {
  return (
    <form className="register-form" onSubmit={onSubmit}>
      <h2>Register</h2>

      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        value={firstname}
        onChange={(e) => onChange("firstname", e.target.value)}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        value={lastname}
        onChange={(e) => onChange("lastname", e.target.value)}
        required
      />

      <label htmlFor="studentId">Student ID:</label>
      <input
        type="text"
        id="studentId"
        value={studentId}
        onChange={(e) => onChange("studentId", e.target.value)}
        required
      />

      <label htmlFor="indexNumber">Index Number:</label>
      <input
        type="text"
        id="indexNumber"
        value={indexNumber}
        onChange={(e) => onChange("indexNumber", e.target.value)}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => onChange("email", e.target.value)}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => onChange("password", e.target.value)}
        required
      />

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => onChange("confirmPassword", e.target.value)}
        required
      />

      <button type="submit">Register</button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

const LecturerRegisterForm = ({
  onSubmit,
  onChange,
  firstname,
  lastname,
  email,
  password,
  confirmPassword,
  error,
}) => {
  return (
    <form className="register-form" onSubmit={onSubmit}>
      <h2>Register</h2>

      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        value={firstname}
        onChange={(e) => onChange("firstname", e.target.value)}
        required
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        value={lastname}
        onChange={(e) => onChange("lastname", e.target.value)}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => onChange("email", e.target.value)}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => onChange("password", e.target.value)}
        required
      />

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => onChange("confirmPassword", e.target.value)}
        required
      />

      <button type="submit">Register</button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

const Register = ({ userType }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    studentId: "",
    indexNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the registerUser function from api.js
      await registerUser(userType, formData);

      console.log("Registration successful");
      navigate("/login");
      // Handle successful registration, e.g., redirect to login page
    } catch (error) {
      console.error("Error during registration:", error.message);
      setError("An error occurred. Please try again.");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="main">
      <div className="register-container">
        {userType === "student" ? (
          <StudentRegisterForm
            onSubmit={handleSubmit}
            onChange={handleChange}
            firstname={formData.firstname}
            lastname={formData.lastname}
            studentId={formData.studentId}
            indexNumber={formData.indexNumber}
            email={formData.email}
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            error={error}
          />
        ) : (
          <LecturerRegisterForm
            onSubmit={handleSubmit}
            onChange={handleChange}
            firstname={formData.firstname}
            lastname={formData.lastname}
            email={formData.email}
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            error={error}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userType: state.user,
  };
};

export default connect(mapStateToProps)(Register);
