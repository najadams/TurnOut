import React, { useState } from "react";
import "./FilterBar.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const FilterBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const initialValues = {
    className: "",
    studentName: "",
    numOfMissOuts: "",
    attendanceDates: [""],
  };

  const validationSchema = Yup.object({
    className: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid Email").required("Required!"),
    channel: Yup.string().required("Required!"),
    comments: Yup.string().required("Required!"),
    address: Yup.string().required("Required!"),
  });
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`Filter ${isOpen ? "open" : "close"}`}>
      <button onClick={toggleNav} className="toggle-button">
        <h1 style={{ fontFamily: "monospace" }}>Filters...</h1>
        <h1>☰</h1>
      </button>

      <nav className={`nav fcard ${isOpen ? "open" : "close"}`}>
        {/* <Formik
        initialValues={initialValues}
        >
          <Form>

          </Form>
        </Formik> */}
      </nav>
    </div>
  );
};

export default FilterBar;
