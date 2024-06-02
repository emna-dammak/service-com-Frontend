import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OtherServices = ({ services, ServiceProvider, AllServices}) => {

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 2;
  

       
      const indexOfLastService = currentPage * servicesPerPage;
      const indexOfFirstService = indexOfLastService - servicesPerPage;
      const currentServices = services.slice(indexOfFirstService, indexOfLastService);
    
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(services.length / servicesPerPage); i++) {
        pageNumbers.push(i);
      }

      const handleViewMore = (service) => {
        const relatedServices = AllServices.filter(s => s.profession.user.id === service.profession.user.id && s.id !== service.id);
        navigate(`/service/${service.id}`, { state: { service, relatedServices, allServices:AllServices } });
      };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-8 pt-2">
        Other services provided by 
        <a href="" className="text-sm font-semibold text-teal-600 bg-gray-200 py-1 px-2 rounded-md hover:bg-gray-300 transition duration-200 ease-in-out ml-2">
            {ServiceProvider} 
        </a>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {currentServices.map((service) => (
          <div key={service.id} className="border border-gray-200 rounded-lg relative w-full max-w-xs mx-auto">
            <div className="pt-0">
              <img src={`/${service.imagePath}`} alt={service.title} className="w-full h-40 object-cover mb-4 mx-auto rounded" />
            </div>
            <div className="p-4">
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
              <h3 className="text-md font-semibold mb-2 text-gray-600">
                {service.title}
              </h3>
              <p className="text-gray-700 mb-4 text-sm">{service.description}</p>
              <button className="bg-green-400 hover:bg-green-500 text-white font-medium py-1 px-4 rounded w-full" onClick={() => handleViewMore(service)}>
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10 space-x-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-green-400 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-l-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`bg-green-400 hover:bg-green-500 text-white font-medium py-2 px-4 rounded ${number === currentPage ? 'bg-green-300' : ''}`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastService >= services.length}
          className="bg-green-400 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-r-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OtherServices;
