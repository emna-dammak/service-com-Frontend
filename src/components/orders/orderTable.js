// src/OrderTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import "./pagination.css"; // Create this file to style the pagination

const API_URL = process.env.REACT_APP_SERVER_URL;

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [role, setRole] = useState("");
  const ordersPerPage = 10;

  useEffect(() => {
    fetchOrders();
    fetchUserRole();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}order`, {
        withCredentials: true,
      }); // Replace with your actual API endpoint
      console.log("Fetched orders:", response.data);
      const mappedData = response.data.map((item, index) => ({
        order: `#${item.id}`,
        date: new Date(item.date).toLocaleString(),
        serviceProviderInitials: `${item.service.profession.user.firstName[0]}${item.service.profession.user.lastName[0]}`,
        serviceProvider: `${item.service.profession.user.firstName} ${item.service.profession.user.lastName}`,
        serviceProvideremail: `${item.service.profession.user.email}`,
        clientInitials: `${item.user.firstName[0]}${item.user.lastName[0]}`,
        client: `${item.user.firstName} ${item.user.lastName}`,
        clientemail: `${item.user.email}`,
        status: `${item.status}`,
      }));
      setOrders(mappedData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const fetchUserRole = async () => {
    const response = await axios.get(`${API_URL}user/auth`, {
      withCredentials: true,
    });
    setRole(response.data.role);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const columnsUser = [
    {
      name: "Order",
      selector: (row) => row.order,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Service Provider",
      cell: (row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-red">{row.serviceProviderInitials}</span>
          </div>
          <div className="ml-2">
            <div>{row.serviceProvider}</div>
            <div className="text-sm text-gray-500">
              {row.serviceProvideremail}
            </div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full 
        ${
          row.status === "Finie"
            ? "bg-green-200 text-green-800"
            : row.status === "En attente de confirmaiton"
            ? "bg-blue-200 text-blue-800"
            : row.status === "Confirmé"
            ? "bg-orange-200 text-orange-800"
            : ""
        }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
  ];

  const columnsServiceProvider = [
    {
      name: "Order",
      selector: (row) => row.order,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Client",
      cell: (row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-white">{row.clientInitials}</span>
          </div>
          <div className="ml-2">
            <div>{row.client}</div>
            <div className="text-sm text-gray-500">{row.clientemail}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full 
        ${
          row.status === "Finie"
            ? "bg-green-200 text-green-800"
            : row.status === "En attente de confirmaiton"
            ? "bg-blue-200 text-blue-800"
            : row.status === "Confirmé"
            ? "bg-orange-200 text-orange-800"
            : ""
        }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
  ];

  const columnsAdmin = [
    {
      name: "Order",
      selector: (row) => row.order,
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Service Provider",
      minWidth: "200px",
      cell: (row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-white">{row.serviceProviderInitials}</span>
          </div>
          <div className="ml-2">
            <div>{row.serviceProvider}</div>
            <div className="text-sm text-gray-500">
              {row.serviceProvideremail}
            </div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Client",
      minWidth: "200px",

      cell: (row) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-white">{row.clientInitials}</span>
          </div>
          <div className="ml-2">
            <div>{row.client}</div>
            <div className="text-sm text-gray-500">{row.clientemail}</div>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full 
        ${
          row.status === "Finie"
            ? "bg-green-200 text-green-800"
            : row.status === "En attente de confirmaiton"
            ? "bg-blue-200 text-blue-800"
            : row.status === "Confirmé"
            ? "bg-orange-200 text-orange-800"
            : ""
        }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
  ];

  const paginatedOrders = orders.slice(
    currentPage * ordersPerPage,
    (currentPage + 1) * ordersPerPage
  );

  const getColumns = () => {
    if (role === "ADMIN") {
      return columnsAdmin;
    }
    if (role === "USER") {
      return columnsUser;
    }
    if (role === "SERVICE_PROVIDER") {
      return columnsServiceProvider;
    }
    return [];
  };

  return (
    <div className="p-4 rounded-lg shadow-lg overflow-hidden">
      <DataTable
        columns={getColumns()}
        data={paginatedOrders}
        pagination={false}
      />
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(orders.length / ordersPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default OrderTable;
