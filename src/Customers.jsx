import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  Pagination,
  Form,
  Modal,
  Alert,
  Row,
  Col,
} from "react-bootstrap";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    place: "",
    phoneNumber: "",
    emailID: "",
    baseAmount: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/Customers")
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the customer data!", error);
        setLoading(false);
      });
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(customers.length / pageSize)) {
      setCurrentPage(newPage);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!newCustomer.name) errors.name = "Name is required";
    if (!newCustomer.place) errors.place = "Place is required";
    if (!newCustomer.phoneNumber)
      errors.phoneNumber = "Phone number is required";
    if (!newCustomer.emailID) errors.emailID = "Email ID is required";
    if (!newCustomer.baseAmount) errors.baseAmount = "Base amount is required";
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleInsert = () => {
    if (!validateForm()) return;

    axios
      .post("http://localhost:8082/api/Customers", newCustomer)
      .then((response) => {
        setCustomers([...customers, response.data]);
        setNewCustomer({
          name: "",
          place: "",
          phoneNumber: "",
          emailID: "",
          baseAmount: "",
        });
        setAlertMessage("Customer added successfully!");
        setShowModal(false); // Close modal after adding
      })
      .catch((error) => {
        console.error("There was an error inserting the customer data!", error);
        setAlertMessage("Error adding customer. Please try again.");
        setShowModal(false); // Close modal after showing alert
      });
  };

  const handleUpdate = (id) => {
    const updatedCustomer = customers.find((customer) => customer.id === id);
    if (!updatedCustomer) return;

    axios
      .put("http://localhost:8082/api/Customers/${id}", updatedCustomer)
      .then((response) => {
        setCustomers(
          customers.map((customer) =>
            customer.id === id ? response.data : customer
          )
        );
        setAlertMessage("Customer updated successfully!");
      })
      .catch((error) => {
        console.error("There was an error updating the customer data!", error);
        setAlertMessage("Error updating customer. Please try again.");
      });
  };

  const handleDelete = (id) => {
    alert(id)
    
    axios
      .delete("http://localhost:8082/api/Customers/deletecustomer/" + id)
      .then(() => {
        setCustomers(customers.filter((customer) => customer.id !== id));
        setAlertMessage("Customer deleted successfully!");
      })
      .catch((error) => {
        console.error("There was an error deleting the customer data!", error);
        setAlertMessage("Error deleting customer. Please try again.");
      });
  };

  const indexOfLastCustomer = currentPage * pageSize;
  const indexOfFirstCustomer = indexOfLastCustomer - pageSize;
  const currentCustomers = sortedCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Customer List</h2>

      {/* Alert Message */}
      {alertMessage && (
        <Alert variant="info" onClose={() => setAlertMessage("")} dismissible>
          {alertMessage}
        </Alert>
      )}

      <Button
        variant="success"
        onClick={() => setShowModal(true)}
        className="mb-3"
      >
        Add New Customer
      </Button>

      <Table striped bordered hover responsive className="mt-4">
        <thead className="table-dark">
          <tr>
            <th onClick={() => handleSort("id")}>
              ID{" "}
              {sortConfig.key === "id"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th onClick={() => handleSort("name")}>
              Name{" "}
              {sortConfig.key === "name"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th onClick={() => handleSort("place")}>
              Place{" "}
              {sortConfig.key === "place"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th onClick={() => handleSort("phoneNumber")}>
              Phone{" "}
              {sortConfig.key === "phoneNumber"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th onClick={() => handleSort("emailID")}>
              Email{" "}
              {sortConfig.key === "emailID"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th onClick={() => handleSort("baseAmount")}>
              Base Amount{" "}
              {sortConfig.key === "baseAmount"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.length > 0 ? (
            currentCustomers.map((customer, index) => (
              <tr key={customer.id || index}>
                <td>{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.place}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.emailID}</td>
                <td>{customer.baseAmount}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleUpdate(customer.id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <Pagination.Item>{currentPage}</Pagination.Item>
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(customers.length / pageSize)}
          />
        </Pagination>
      </div>

      {/* Modal for adding customer */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={12}>
                <Form.Group controlId="name">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={newCustomer.name}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, name: e.target.value })
                    }
                    isInvalid={formErrors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.name}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="place">
                  <Form.Control
                    type="text"
                    placeholder="Place"
                    value={newCustomer.place}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, place: e.target.value })
                    }
                    isInvalid={formErrors.place}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.place}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group controlId="phoneNumber">
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    value={newCustomer.phoneNumber}
                    onChange={(e) =>
                      setNewCustomer({
                        ...newCustomer,
                        phoneNumber: e.target.value,
                      })
                    }
                    isInvalid={formErrors.phoneNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.phoneNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="emailID">
                  <Form.Control
                    type="email"
                    placeholder="Email ID"
                    value={newCustomer.emailID}
                    onChange={(e) =>
                      setNewCustomer({
                        ...newCustomer,
                        emailID: e.target.value,
                      })
                    }
                    isInvalid={formErrors.emailID}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.emailID}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="baseAmount">
                  <Form.Control
                    type="number"
                    placeholder="Base Amount"
                    value={newCustomer.baseAmount}
                    onChange={(e) =>
                      setNewCustomer({
                        ...newCustomer,
                        baseAmount: e.target.value,
                      })
                    }
                    isInvalid={formErrors.baseAmount}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.baseAmount}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleInsert}>
            Add Customer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Customers;
