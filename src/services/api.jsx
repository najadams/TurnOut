import { API_BASE_URL } from "../containers";
import axios from "axios";

const loginStudent = async (studentId, firstname, lastname) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/student`, {
      firstname,
      lastname,
      studentId,
    });

    if (response.status !== 200) {
      const errorData = response.data;
      throw new Error(errorData.message || "Login failed");
    }

    return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Error during login:", error.message);
    throw new Error("Login failed");
  }
};

const loginLecturer = async (referenceId, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/lecturer`, {
      referenceId,
      password,
    });

    if (response.status !== 200) {
      const errorData = response.data;
      throw new Error(errorData.message || "Login failed");
    }

    return response.data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw new Error(error.message);
  }
};

const registerUser = async (userType, formData) => {
  const apiEndpoint =
    userType === "student"
      ? `${API_BASE_URL}/register/student`
      : `${API_BASE_URL}/register/lecturer`;

  try {
    const response = await axios.post(apiEndpoint, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    console.log(data);
    return data; // Return the response data if needed
  } catch (error) {
    if (error.response) {
      console.error("Server responded with error:", error.response.data);
      throw new Error(error.response.data.message || "Registration failed");
    } else if (error.request) {
      console.error("No response received from the server");
      throw new Error(
        "Registration failed. No response received from the server"
      );
    } else {
      console.error("Error during registration:", error.message);
      throw new Error("Registration failed");
    }
  }
};

export { registerUser, loginStudent, loginLecturer };
