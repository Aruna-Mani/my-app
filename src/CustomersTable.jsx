// import React from "react";
// import { Table } from "react-bootstrap";

// const CustomersTable = ({ customers }) => {
//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-3">Customers List</h2>
//       <Table striped bordered hover responsive>
//         <thead className="table-dark">
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Place</th>
//             <th>Phone Number</th>
//             <th>Email ID</th>
//             <th>Base Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.length > 0 ? (
//             customers.map((customer, index) => (
//               <tr key={customer.id}>
//                 <td>{index + 1}</td>
//                 <td>{customer.name}</td>
//                 <td>{customer.place}</td>
//                 <td>{customer.phoneNumber}</td>
//                 <td>{customer.emailId}</td>
//                 <td>{customer.baseAmount.toFixed(2)}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center">
//                 No data available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default CustomersTable;

import React, { useEffect, useState } from "react";
// import axios from "axios";

const CustomersTable = () => {
    const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch customers data from the API
  useEffect(() => {
    fetch("https://localhost:7053/api/Customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data); // Set customers data
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("There was an error fetching the customer data!", error);
        setLoading(false); // Stop loading on error
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Customer List</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Place</th>
            <th>Phone Number</th>
            <th>Email ID</th>
            <th>Base Amount</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.ID}>
              <td>{customer.ID}</td>
              <td>{customer.Name}</td>
              <td>{customer.Place}</td>
              <td>{customer.PhoneNumber}</td>
              <td>{customer.EmailID}</td>
              <td>{customer.BaseAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch customers data from the API
//   useEffect(() => {
//     axios
//       .get("https://localhost:7053/api/customers")
//       .then((response) => {
//         setCustomers(response.data); // Set customers data
//         setLoading(false); // Stop loading
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the customer data!", error);
//         setLoading(false); // Stop loading on error
//       });
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Customer List</h1>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Place</th>
//             <th>Phone Number</th>
//             <th>Email ID</th>
//             <th>Base Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.map((customer) => (
//             <tr key={customer.ID}>
//               <td>{customer.ID}</td>
//               <td>{customer.Name}</td>
//               <td>{customer.Place}</td>
//               <td>{customer.PhoneNumber}</td>
//               <td>{customer.EmailID}</td>
//               <td>{customer.BaseAmount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
//};

export default CustomersTable;
