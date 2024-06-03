import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/service', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          console.error('Failed to fetch services data');
          setError('Failed to fetch services data');
          return;
        }

        const data = await response.json();
        const servicesWithRatings = await Promise.all(
          data.map(async (service) => {
            try {
              const ratingResponse = await fetch(`http://localhost:3000/ratings/${service.id}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
              });

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
              console.error('Failed to fetch rating:', error);
              return {
                ...service,
                avgRating: null,
                ratingCount: null,
              };
            }
          })
        );

        setServices(servicesWithRatings);

        // Extract unique categories and regions
        const uniqueCategories = [...new Set(data.map(service => service.profession.category.title))];
        setCategories(uniqueCategories);

        const uniqueRegions = [...new Set(data.map(service => service.profession.user.gouvernorat))];
        setRegions(uniqueRegions);

      } catch (error) {
        console.error('Fetching data failed:', error);
        setError('Fetching data failed');
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category') || '';
    const region = queryParams.get('region') || '';
    setSelectedCategory(category);
    setSelectedRegion(region);
  }, [location.search]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    navigate(`?category=${category}&region=${selectedRegion}`);
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    navigate(`?category=${selectedCategory}&region=${region}`);
  };

  const maxPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredServices = services.filter(service => {
    return (
      (selectedCategory === '' || service.profession.category.title === selectedCategory) &&
      (selectedRegion === '' || service.profession.user.gouvernorat === selectedRegion)
    );
  });

  const totalPages = Math.ceil(filteredServices.length / maxPerPage);

  const startIndex = (currentPage - 1) * maxPerPage;
  const endIndex = Math.min(startIndex + maxPerPage, filteredServices.length);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewMore = (service) => {
    const relatedServices = services.filter(s => s.profession.user.id === service.profession.user.id && s.id !== service.id);
    navigate(`/service/${service.id}`, { state: { service, relatedServices, allServices: services } });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 pt-8 pb-8 mb-4 font-sans">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-medium font-sans mb-4 text-gray-600">Top Rated Services of the Month</h2>
        <div className="flex space-x-4">
          <select
            className="px-4 py-2 border rounded text-gray-500 text-sm w-64"
            value={selectedRegion}
            onChange={handleRegionChange}
          >
            <option value="" className="text-gray-500">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          <select
            className="px-4 py-2 border rounded text-gray-500 text-sm w-64"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="" className="text-gray-500">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.slice(startIndex, endIndex).map((service) => (
          <div key={service.id} className="border border-gray-200 rounded-lg ml-0 relative">
            <div className="pt-4">
              <img src={`/${service.imagePath}`} alt={service.title} className="w-80 h-56 object-cover mb-4 mx-auto rounded" />
            </div>
            <div className="p-8 pt-4">
              <div className="mb-2 flex justify-between">
                <div className="mr-4 bg-blue-100 text-blue-700 py-1 px-2 rounded">
                  <span className="text-sm font-medium">{service.profession.category.title}</span>
                </div>
                <div className="flex items-center">
                  <span className="ml-1 font-bold">{service.avgRating ? service.avgRating.toFixed(1) : 'N/A'}</span>
                  <span className="text-yellow-500 ml-1 text-xl">&#9733;</span>
                  <span className="text-gray-500 ml-2">({service.ratingCount || 'N/A'})</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-600">
                {service.title}
              </h3>
              <p className="text-gray-700 mb-10">{service.description}</p>
              <button
                className="bg-green-400 hover:bg-green-500 text-white font-medium py-1 px-4 rounded w-full"
                onClick={() => handleViewMore(service)}
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4 pt-8">
        <button
          className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-l text-base font-medium text-gray-600 mr-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={`bg-gray-200 py-2 px-4 rounded text-base font-medium ${currentPage === page ? 'bg-green-400 text-white' : 'hover:bg-gray-300'} mr-2`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
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

export default ServiceList;
