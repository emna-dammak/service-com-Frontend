import React, { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_SERVER_URL;

const ServiceListProvider = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}service`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Failed to fetch services data");
          setError("Failed to fetch services data");
          return;
        }

        const data = await response.json();

        // Fetch average ratings and total number of ratings for each service
        const servicesWithRatings = await Promise.all(
          data.map(async (service) => {
            try {
              const ratingResponse = await fetch(
                `${API_URL}ratings/${service.id}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                }
              );

              if (ratingResponse.ok) {
                const ratingData = await ratingResponse.json();
                return {
                  ...service,
                  avgRating: ratingData.averageRating,
                  ratingCount: ratingData.count,
                };
              } else {
                return {
                  ...service,
                  avgRating: null,
                  ratingCount: null,
                };
              }
            } catch (error) {
              console.error("Failed to fetch rating:", error);
              return {
                ...service,
                avgRating: null,
                ratingCount: null,
              };
            }
          })
        );

        setServices(servicesWithRatings);
      } catch (error) {
        console.error("Fetching data failed:", error);
        setError("Fetching data failed");
      }
    };

    fetchData();
  }, []);

  const maxPerPage = 6; // Maximum number of services per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(services.length / maxPerPage);

  // Calculate index range for services to display on the current page
  const startIndex = (currentPage - 1) * maxPerPage;
  const endIndex = Math.min(startIndex + maxPerPage, services.length);

  // Function to handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 pt-8 pb-8 mb-4 font-sans">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-medium font-sans mb-4 text-gray-600">
          My Services
        </h2>
        <div className="flex space-x-4">
          <select className="px-4 py-2 border rounded text-gray-500 text-sm w-64">
            <option value="" className="text-gray-500">
              All Regions
            </option>
            {/* Add options for regions */}
          </select>
          <select className="px-4 py-2 border rounded text-gray-500 text-sm w-64">
            <option value="" className="text-gray-500">
              All Categories
            </option>
            {/* Add options for categories */}
          </select>
          <button className="bg-green-400 hover:bg-green-500 text-white weight-500 py-2 px-4 rounded">
            Add Service
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Display services for the current page */}
        {services.slice(startIndex, endIndex).map((service) => (
          <div
            key={service.id}
            className="border border-gray-200 rounded-lg ml-0 relative"
          >
            <div className="pt-4">
              <img
                src={service.imagePath}
                alt={service.title}
                className="w-80 h-56 object-cover mb-4 mx-auto rounded"
              />
            </div>
            <div className="p-8 pt-4">
              <div className="mb-2 flex justify-between">
                <div className="mr-4 bg-blue-100 text-blue-700 py-1 px-2 rounded">
                  <span className="text-sm font-medium font-public-sans">
                    {service.profession.category.title}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="ml-1 font-bold">
                    {service.avgRating ? service.avgRating.toFixed(1) : "N/A"}
                  </span>
                  <span className="text-yellow-500 ml-1 text-xl">&#9733;</span>
                  <span className="text-gray-500 ml-2">
                    ({service.ratingCount || "N/A"})
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 font-public-sans text-gray-600">
                {service.title}
              </h3>
              <p className="text-gray-700 mb-10">{service.description}</p>
              <button className="bg-green-300 hover:bg-green-400 text-white font-medium py-2 px-4 rounded w-full flex justify-center items-center">
                <svg
                  className="mr-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 7H6C4.89543 7 4 7.89543 4 9V18C4 19.1046 4.89543 20 6 20H15C16.1046 20 17 19.1046 17 18V15"
                    stroke="#63C474"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 15.0002H12L20.5 6.50023C21.3284 5.6718 21.3284 4.32865 20.5 3.50023C19.6716 2.6718 18.3284 2.6718 17.5 3.50023L9 12.0002V15.0002"
                    stroke="#63C474"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 5L19 8"
                    stroke="#63C474"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Edit Service
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="flex justify-center mt-4 pt-8">
        {/* Previous button */}
        <button
          className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-l text-base font-medium text-gray-600 mr-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Page buttons */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={`bg-gray-200 py-2 px-4 rounded text-base font-medium ${
                currentPage === page
                  ? "bg-green-400 text-white"
                  : "hover:bg-gray-300"
              } mr-2`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )
        )}

        {/* Next button */}
        <button
          className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-r text-base font-medium text-gray-600"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ServiceListProvider;
