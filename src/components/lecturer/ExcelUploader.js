import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import axios from "axios";
import { API_BASE_URL } from "../../containers";

const ExcelUploader = () => {
  const [excelData, setExcelData] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Assuming the first sheet is the one of interest
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert Excel data to JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Extract headers and data
      const [headers, ...rows] = jsonData;

      // Assuming you have a backend service for creating MongoDB collections
      // Send headers and data to your backend for further processing
        createMongoCollection({ headers, rows });
      console.log(headers);
      console.log(...rows);
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xlsx, .xls",
    maxFiles: 1,
  });

  const createMongoCollection = ({ headers, rows }) => {
    // Send headers and rows to your backend for further processing
    // (using axios for the asynchronous request)
    axios
      .post(`${API_BASE_URL}/createMongoCollection`, { headers, rows })
      .then((response) => {
        console.log("MongoDB collection created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating MongoDB collection:", error);
      });
  };

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag and drop an Excel file here, or click to select one</p>
      </div>

      {excelData && (
        <div>
          <h3>Excel Data:</h3>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default ExcelUploader;
