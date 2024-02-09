import { API_BASE_URL } from "../containers";
import axios from "axios";

// not sure if this is working yet
const loginStudent = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return data; // Return the response data if needed
  } catch (error) {
    console.error("Error during login:", error.message);
    throw new Error("Login failed");
  }
};

const loginLecturer = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/lecturer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return data; // Return the response data if needed
  } catch (error) {
    console.error("Error during login:", error.message);
    throw new Error("Login failed");
  }
};

// this is working
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

    // Axios automatically throws an error for non-2xx responses
    const data = response.data;
    console.log(data);
    return data; // Return the response data if needed
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a non-2xx status
      console.error("Server responded with error:", error.response.data);
      throw new Error(error.response.data.message || "Registration failed");
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from the server");
      throw new Error(
        "Registration failed. No response received from the server"
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error during registration:", error.message);
      throw new Error("Registration failed");
    }
  }
};

export { registerUser, loginStudent, loginLecturer };
