import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_SERVER_URL;

const BrowseByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}category`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Failed to fetch categories data");
          setError("Failed to fetch categories data");
          return;
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Fetching data failed:", error);
        setError("Fetching data failed");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      className="bg-gray w-1128 p-30 grid grid-cols-1 gap-9"
      style={{
        borderRadius: "5px",
        backgroundColor: "rgba(75, 70, 92, 0.02)",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
      }}
    >
      <h3 className="text-2xl text-gray-600 font-semibold text-center mt-8">
        Browse By Category
      </h3>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-3 gap-8 ml-10 mr-10 mb-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="w-305.33 p-7 bg-white rounded-lg shadow-md"
          >
            <div className="flex items-center">
              <img
                src={category.iconPath}
                alt="Category Icon"
                className="w-8 h-8 mr-4"
              />
              <h5 className="text-lg text-gray-600 font-semibold">
                {category.title}
              </h5>
            </div>
            <div>
              <p className="mt-5 text-gray-500 font-semibold">
                {category.serviceCount} Services
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseByCategory;
