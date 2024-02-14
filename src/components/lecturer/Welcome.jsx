import React, { useEffect } from "react";
import Loader from "../common/Loader/Loader";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/lecturer/dashboard");
    }, 3000);

    // Clear the timeout if the component is unmounted before the timeout completes
    return () => clearTimeout(timeoutId);
  }, [navigate]); // Added navigate to the dependency array

  return (
    <div className="center " style={{ height: "100%" }}>
      <Loader />
    </div>
  );
};

export default Welcome;
