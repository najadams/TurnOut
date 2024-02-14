import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../containers";
import { useNavigate } from "react-router-dom";

const ExcelUploader = () => {
  const navigate = useNavigate();
  const [excelData, setExcelData] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const lecturerInfo = useSelector((state) => state.lecturer.lecturerInfo.user);

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const [headers, ...rows] = jsonData;
      const formattedRows = rows.map((row) => {
        let obj = {};
        headers.forEach((header, i) => {
          obj[header] = row[i];
        });
        return obj;
      });
      setExcelData({ headers, rows: formattedRows });
    };

    reader.readAsArrayBuffer(file);
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      setError("No file selected. Please select a valid Excel file.");
      return;
    }

    const file = acceptedFiles[0];
    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      setError("Invalid file format. Please select a valid Excel file.");
      return;
    }

    setError("");
    processFile(file);
  };

  const createMongoCollection = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(
        `${API_BASE_URL}/createMongoCollection`,
        data
      );
      setCompleted(true);
      return response.data;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const createClass = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (!excelData) {
        setError("Please upload an Excel file first.");
        return;
      }

      const collectionData = {
        ClassName: name,
        lecturerId: lecturerInfo._id,
        headers: excelData.headers,
        rows: excelData.rows,
      };

      const response = await axios.post(
        `${API_BASE_URL}/createMongoCollection`,
        collectionData
      );

      console.log(response.data);
      setError("");
      setCompleted(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xlsx, .xls",
    maxFiles: 1,
  });

  return (
    <div className="fcard">
      <h2 style={{ paddingBottom: 50 }}>Create New Class</h2>
      {!completed ? (
        <form onSubmit={createClass}>
          <label htmlFor="name">
            <h4>Class Name</h4>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Class Name..."
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {!excelData && (
            <div {...getRootProps()} style={dropzoneStyles}>
              <input {...getInputProps()} />
              <i className="bx bx-file" style={{ fontSize: 40 }}></i>
              <p>Drag and drop an Excel file here, or click to select one</p>
            </div>
          )}
          {error && <div style={{ color: "red" }}>{error}</div>}
          {loading && <div>Loading...</div>}
          {excelData && !loading && (
            <div>
              <h3>Data received</h3>
              <div className="create">
                <button type="submit">
                  <span>Create Class</span>
                </button>
              </div>
            </div>
          )}
        </form>
      ) : (
        <div style={dropzoneStyles}>
          <h3>{name} created successfully </h3>
          <button onClick={() => navigate("/lecturer/dashboard")}>
            <span>DashBoard</span>
          </button>
        </div>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "120px",
  textAlign: "center",
  cursor: "pointer",
};

export default ExcelUploader;
