import axios from "axios";
import React, { useState } from "react";

const RenderTable = () => {
  const [column, setColumn] = useState([]);
  const [record, setRecord] = useState([]);

  axios
    .get("https://jsonplaceholder.typicode.com/albums")
    .then((res) => res.data)
    .then((data) => {
      setColumn(Object.keys(data[0]));
      setRecord(data);
    });
  return (
    <div>
      RenderTable
      <table>
        <thead>
          <tr>
            {column.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {record.map((data) => (
            <tr key={data.id}>
              <td>{data.userId}</td>
              <td>{data.id}</td>
              <td>{data.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RenderTable;
