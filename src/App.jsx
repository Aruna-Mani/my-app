import React from "react";
// import CustomersTable from "./CustomersTable";
import Customers from "./Customers";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  // const customers = [
  //   { id: 1, name: "John Doe", place: "New York", phoneNumber: "1234567890", emailId: "john@example.com", baseAmount: 100.5 },
  //   { id: 2, name: "Jane Smith", place: "Los Angeles", phoneNumber: "9876543210", emailId: "jane@example.com", baseAmount: 250.75 }
  // ];

  // return (
  //   <div className="App">
  //     <CustomersTable customers={customers} />
  //   </div>
  // );
  return (
    <div className="App">
      {/* <CustomersTable /> */}
      <Customers />
    </div>
  );
};

export default App;
