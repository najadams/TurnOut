import React, { useState } from "react";
import "./FilterBar.css";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useQuery } from "react-query";
import axios from "axios";
import { API_BASE_URL } from "..";
import { useSelector } from "react-redux";

const FilterBar = ({ classNames, setChartData, setFormSubmitted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const lecturerId = useSelector(
    (state) => state.lecturer.lecturerInfo.user._id
  );

 const validationSchema = Yup.object({
   className: Yup.string().required("Required"),
   missedAttendance: Yup.number()
     .min(0, "Must be a positive number")
     .integer("Must be an integer"),
   id: Yup.number()
     .min(100, "Must be a more than 2 digits long")
     .integer("must be a number"),
 }).test(
   "either-or",
   "Either missedAttendance or id must be filled",
   (value) => value.missedAttendance || value.id
 );

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
        <h1>My Form</h1>
        <Formik
          initialValues={{
            className: "",
            missedAttendance: "",
            id: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              // Send a GET request to the endpoint
              const response = await axios.get(
                `${API_BASE_URL}/missed/${lecturerId}/${values.className}/${values.missedAttendance}`
              );

              // store the data in the call back function
              // Pass the data to the parent component
              setChartData(response.data);
              setFormSubmitted(true)
              // Handle the response here. For example, you might want to display the data in an alert:
              alert(JSON.stringify(response.data, null, 2));
            } catch (error) {
              // Handle the error here. For example, you might want to display an error message:
              alert(`An error occurred: ${error.message}`);
            }
          }}>
          {({ errors, touched, values }) => (
            <Form>
              <label htmlFor="className">Class Name</label>
              <Field as="select" name="className">
                <option value="">Select a class</option>
                {classNames.map((className, index) => {
                  return (
                    <option value={className} key={index}>
                      {className}
                    </option>
                  );
                })}
              </Field>
              {errors.className && touched.className ? (
                <div className="error">{errors.className}</div>
              ) : null}

              <label htmlFor="missedAttendance">
                Number of Missed Attendance
              </label>
              <Field
                type="number"
                name="missedAttendance"
                disabled={!!values.id}
              />
              {errors.missedAttendance && touched.missedAttendance ? (
                <div className="error">{errors.missedAttendance}</div>
              ) : null}

              <label htmlFor="id">ID</label>
              <Field
                type="number"
                name="id"
                disabled={!!values.missedAttendance}
              />
              {errors.id && touched.id ? (
                <div className="error">{errors.id}</div>
              ) : null}

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </nav>
    </div>
  );
};

export default FilterBar;
