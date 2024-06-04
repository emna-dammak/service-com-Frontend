import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_SERVER_URL;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleCategoryClick = (categoryTitle) => {
    navigate(`/service?category=${categoryTitle}&region=`);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center py-16">
      <h3 className="text-3xl font-bold text-gray-900 mb-12">
        Choose From Our <span className="text-teal-500">Categories</span>
      </h3>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            role="button"
            className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
            onClick={() => handleCategoryClick(category.title)}
          >
            <img
              src={`/${category.iconPath}`}
              alt={category.title}
              className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-100"
              style={{ opacity: 0.75 }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-25">
              <h4 className="text-white text-lg font-semibold">
                {category.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
