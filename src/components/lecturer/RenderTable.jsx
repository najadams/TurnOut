// RenderTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RenderTable.css";
import { API_BASE_URL } from "../../containers";
import Loader from "../common/Loader/Loader";

const RenderTable = ({ data, tableName }) => {
  const [column, setColumn] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data.length > 0) {
      const items = Object.keys(data[0]);
      const selectedItems = items.slice(1, 5); // Adjust the range based on your needs
      setColumn(selectedItems);
      setLoading(false); // Set loading to false once data is available
    }
  }, [data]);

  return (
    <div className="body">
      <main className="table">
        <section className="table__header">
          <h1>{tableName}</h1>
        </section>
        <section className="table__body">
          {loading ? (
            // <p>Loading...</p>
            <Loader />
          ) : (
            <table>
              <thead>
                <tr>
                  {column.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((rowData) => (
                  <tr key={rowData._id}>
                    {column.map((col) => (
                      <td key={col}>{rowData[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default RenderTable;
