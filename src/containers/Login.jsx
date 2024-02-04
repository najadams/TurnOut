import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router";
import {
  fetchLecturerFailure,
  fetchLecturerRequest,
  loginLecturerSuccess,
  logoutLecturer,
  setLecturerData,
} from "../actions/lecturers/lecturerActions";
import { connect } from "react-redux";
import { loginLecturer, loginStudent } from "../services/api";
import {
  fetchStudentFailure,
  fetchStudentRequest,
  fetchStudentSuccess,
  loginStudentSuccess,
  logoutStudent,
} from "../actions/students/studentActions";

// const StudentLoginForm = ({
//   onSubmit,
//   onChange,
//   // classCode,
//   email,
//   password,
//   error,
// }) => {
//   return (
//     <form className="login-form">
//       <h2>Login</h2>

//       <label htmlFor="email">Email:</label>
//       <input
//         type="email"
//         id="email"
//         value={email}
//         onChange={(e) => onChange("email", e.target.value)}
//         required
//       />

//       <label htmlFor="password">Password:</label>
//       <input
//         type="password"
//         id="password"
//         value={password}
//         onChange={(e) => onChange("password", e.target.value)}
//         required
//       />

//       <button type="submit" onClick={onSubmit}>
//         <span>Login</span>
//       </button>
//       {error && <p className="error-message">{error}</p>}
//     </form>
//   );
// };

// const LecturerLoginForm = ({ onSubmit, onChange, email, password, error }) => {
//   const navigate = useNavigate();
//   return (
//     <form className="login-form">
//       <h2>Login</h2>

//       <label htmlFor="email">Email:</label>
//       <input
//         type="email"
//         id="email"
//         value={email}
//         onChange={(e) => onChange("email", e.target.value)}
//         required
//       />

//       <label htmlFor="password">Password:</label>
//       <input
//         type="password"
//         id="password"
//         value={password}
//         onChange={(e) => onChange("password", e.target.value)}
//         required
//       />

//       <div className="flex-items">
//         <button type="submit" onClick={onSubmit}>
//           Login
//         </button>
//         <button type="submit" onClick={() => navigate("/register")}>
//           <span>Sign Up</span>
//         </button>
//       </div>
//       {error && <p className="error-message">{error}</p>}
//     </form>
//   );
// };

// const Login = ({ userType, handleStudentLogin, handleLecturerLogin }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     classCode: "",
//   });
//   const [error, setError] = useState("");

//   const handleSLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { email, password } = formData;
//       const good = await handleStudentLogin(email, password);

//     } catch (error) {
//       console.error(error);
//       console.log(error);
//     }
//   };

//   const handleLLogin = async (e) => {
//     // e.preventDefault();
//     // try {
//     //   const { email, password } = formData;
//     //   const good = await handleLecturerLogin(email, password);
//     //   if (good) {
//     //     navigate("/lecturer");
//     //   }
//     // } catch (error) {
//     //   // console.error("Login failed:", error.message);
//     //   // Handle the error, e.g., display an error message to the user
//     // }
//     try {
//       const { email, password } = formData;
//       const good = await handleLecturerLogin(email, password);
//       if (good) {
//         navigate("/lecturer");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleChange = (field, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };

//   useEffect(() => {
//     setError(""); // Clear any previous errors when userType changes
//   }, [userType]);

//   return (
//     <div className="main">
//       <div className="login-container">
//         {userType === "student" ? (
//           <StudentLoginForm
//             onSubmit={handleSLogin}
//             onChange={handleChange}
//             classCode={formData.classCode}
//             email={formData.email}
//             password={formData.password}
//             error={error}
//           />
//         ) : (
//           <LecturerLoginForm
//             onSubmit={handleLLogin}
//             onChange={handleChange}
//             email={formData.email}
//             password={formData.password}
//             error={error}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

const Login = ({
  userType,
  handleStudentLogin,
  handleLecturerLogin,
  lecturerErr,
  studentErr,
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async () => {
    try {
      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }

      if (userType == "student") {
        await handleStudentLogin(email, password, navigate);
        setError(studentErr);
      } else {
        await handleLecturerLogin(email, password, navigate);
        setError(lecturerErr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="login-container">
        <form className="login-form">
          <h2>Login</h2>

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

          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              onSubmit(); // Invoke the onSubmit function
            }}>
            <span>Login</span>
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userType: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleStudentLogin: async (email, password, navigate) => {
      try {
        dispatch(fetchStudentRequest());
        const user = await loginStudent(email, password);
        dispatch(fetchStudentSuccess(user));
        dispatch(loginStudentSuccess());
        console.log("Logged in user:", user);
        navigate("/student");
      } catch (error) {
        console.error("Login failed:", error.message);
        dispatch(fetchStudentFailure(error));
        dispatch(logoutStudent());
      }
    },
    handleLecturerLogin: async (email, password, navigate) => {
      try {
        dispatch(fetchLecturerRequest());
        const user = await loginLecturer(email, password);
        dispatch(setLecturerData(user));
        dispatch(loginLecturerSuccess());
        navigate("/lecturer");
        console.log("Logged in user:", user);
      } catch (error) {
        dispatch(fetchLecturerFailure());
        dispatch(logoutLecturer());
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
