import React, { useState } from "react";
import Datetime from "react-datetime";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import "../../assets/calendar.css"; // Import the custom calendar styles

const API_URL = process.env.REACT_APP_SERVER_URL;

const ServiceDetails = ({ service }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleOrderClick = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleOrderSubmit = async () => {
    if (!selectedDate) {
      alert("Please select a date and time.");
      return;
    }

    const orderData = {
      serviceId: service.id,
      date: selectedDate.toISOString(),
    };
    try {
      const response = await axios.post(`${API_URL}/order`, orderData, {
        withCredentials: true,
      });
      alert("Order created successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 sticky top-4">
      <div className="text-center">
        <img
          src={`/${service.imagePath}`}
          alt={service.title}
          className="w-full h-full object-cover mb-4 mx-auto rounded"
        />
      </div>
      <div className="p-4">
        <div className="mb-4 text-center flex items-center justify-center">
          <img
            src={`/${service.profession.user.profileImagePath}`}
            alt="Profile"
            className="w-8 h-8 rounded-full mr-2"
          />
          <a
            href="#"
            className="text-sm font-semibold text-teal-600 bg-gray-200 py-1 px-2 rounded-full hover:bg-gray-300 transition duration-200 ease-in-out"
          >
            {service.profession.user.firstName +
              " " +
              service.profession.user.lastName}
          </a>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <a
            href="#"
            className="mr-4 bg-blue-100 text-blue-700 py-1 px-2 rounded-md shadow-md hover:bg-blue-200"
          >
            <span className="text-sm font-medium">
              {service.profession.category.title}
            </span>
          </a>
          <div className="flex items-center">
            <span className="ml-1 font-bold text-lg">
              {service.avgRating ? service.avgRating.toFixed(1) : "N/A"}
            </span>
            <span className="text-yellow-500 ml-1 text-xl">&#9733;</span>
            <span className="text-gray-500 ml-2 text-sm">
              ({service.ratingCount || "N/A"})
            </span>
          </div>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-purple-800">
            {service.title}
          </h3>
          <h3 className="text-2xl font-semibold text-gray-600 mr-4">
            {service.basePrice} TND
          </h3>
        </div>
        <p className="text-gray-700 mb-6">{service.description}</p>
        <div className="flex justify-between mb-2 mt-12">
          <button
            onClick={handleOrderClick}
            className="bg-teal-400 hover:bg-teal-500 text-white font-medium py-2 px-14 rounded-md transition duration-200 ease-in-out"
          >
            Order
          </button>
          <button className="bg-pink-400 hover:bg-gray-500 text-white font-medium py-2 px-14 rounded-md transition duration-200 ease-in-out">
            Chat
          </button>
        </div>
        {showDatePicker && (
          <div className="mt-4">
            <Datetime
              value={selectedDate}
              onChange={handleDateChange}
              inputProps={{ placeholder: "Select Date and Time" }}
              isValidDate={(current) =>
                current.isAfter(moment().subtract(1, "day"))
              }
            />
            <button
              onClick={handleOrderSubmit}
              className="mt-4 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-14 rounded-md transition duration-200 ease-in-out"
            >
              Submit Order
            </button>
          </div>
        )}
        <button
          onClick={handleBackClick}
          className="bg-green-400 hover:bg-green-500 text-white font-medium py-2 rounded-md w-full transition duration-200 ease-in-out"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ServiceDetails;
