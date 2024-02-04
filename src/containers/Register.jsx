import React, { useState } from "react";
import "./Register.css"; // Import the CSS file for styling
import { useNavigate } from "react-router";
import { API_BASE_URL } from ".";

const Register = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/register/lecturer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Registration failed. Server returned:", data); // Log detailed error information
        setError("Registration failed. Please check the provided information.");
      } else {
        console.log("Registration successful:", data.message);
        navigate('/login')
        // Handle successful registration, e.g., redirect to login page
      }
    } catch (error) {
      console.error("Error during registration:", error); // Log generic error information
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="main">
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Register</h2>

          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
