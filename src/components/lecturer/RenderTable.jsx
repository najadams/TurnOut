import axios from "axios";
import React, { useEffect, useState } from "react";
import "./RenderTable.css";
import { API_BASE_URL } from "../../containers";

// const RenderTable = () => {
//   const [column, setColumn] = useState([]);
//   const [record, setRecord] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://jsonplaceholder.typicode.com/albums")
//       .then((res) => res.data)
//       .then((data) => {
//         setColumn(Object.keys(data[0]));
//         setRecord(data);
//       });
//   });
//   return (
//     <div className="body">
//       <main className="table">
//         <section className="table__header">
//           <h1>Cutomer's Orders</h1>
//         </section>
//         <section className="table__body">
//           <table>
//             <thead>
//               <tr>
//                 {column.map((header) => (
//                   <th key={header}>{header}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {record.map((data) => (
//                 <tr key={data.id}>
//                   <td>{data.userId}</td>
//                   <td>{data.id}</td>
//                   <td>{data.title}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
//       </main>
//     </div>
//   );
// };

const RenderTable = () => {
  const [column, setColumn] = useState([]);
  const [record, setRecord] = useState([]);
  var tableName = "Users"
  
  const selectStudents = async (tableName) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/studentcollection/users`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching student data:", error);
      throw error;
    }
  };

  useEffect(() => {
    // Replace "your_table_name" with the actual table name you want to retrieve data for
    const tableName = "users";

    // Call the selectStudents function
    selectStudents()
      .then((data) => {
        console.log(data);
        const Items = Object.keys(data[0]);
        const selectedItems = Items.slice(1, 5);
        setColumn(selectedItems);
        setRecord(data);
      })
      .catch((error) => {
        // Handle errors if needed
      });
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div className="body">
      <main className="table">
        <section className="table__header">
          {/* <h1>Students Data</h1> */}
          <h1>{tableName}</h1>
        </section>
        <section className="table__body">
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
                <tr key={data._id}>
                  {/* Assuming "_id" is a unique identifier */}
                  {/* <td>{data._id}</td> */}
                  <td>{data.firstname}</td>
                  <td>{data.lastname}</td>
                  <td>{data.studentId}</td>
                  <td>{data.indexNumber}</td>
                  {/* <td>{data.email}</td> */}
                  {/* <td>{data.password}</td> */}
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
