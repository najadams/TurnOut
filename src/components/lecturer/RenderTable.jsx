import axios from "axios";
import React, { useState } from "react";
import "./RenderTable.css";

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
    // <main>
    //   RenderTable
    //   <table>
    //     <thead className="table__header">
    //       <tr>
    //         {column.map((header) => (
    //           <th key={header}>{header}</th>
    //         ))}
    //       </tr>
    //     </thead>
    //     <tbody className="table__body">
    //       {record.map((data) => (
    //         <tr key={data.id}>
    //           <td>{data.userId}</td>
    //           <td>{data.id}</td>
    //           <td>{data.title}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </main>
    <div class="body">
      <main class="table">
        <section class="table__header">
          <h1>Cutomer's Orders</h1>
        </section>
        <section class="table__body">
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
        </section>
      </main>
    </div>
  );
};

export default RenderTable;
