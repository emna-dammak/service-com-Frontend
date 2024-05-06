// ServiceList.js
import React, {useState} from 'react';

const services = [
  {
    id: 1,
    title: 'Service 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
    image: 'jardinier.webp', // Replace with actual image URL
    rating: 4.2,
    category: 'Gardening',
    numRatings: '15k'
  },
  {
    id: 2,
    title: 'Service 2',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'bb.webp', // Replace with actual image URL
    rating: 4.8,
    category: 'Babysitting',
    numRatings: '15k'
  },
  {
    id: 3,
    title: 'Service 3',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: 'pl.jpg', // Replace with actual image URL
    rating: 4.0,
    category: 'Plumbing',
    numRatings: '15k'
  },
  {
    id: 4,
    title: 'Service 4',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image: 'jardinier.webp', // Replace with actual image URL
    rating: 4.2,
    category: 'Gardening',
    numRatings: '15k'
  },
  {
    id: 5,
    title: 'Service 5',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.',
    image: 'bb.webp', // Replace with actual image URL
    rating: 4.8,
    category: 'Babysitting',
    numRatings: '15k'
  },
  {
    id: 6,
    title: 'Service 6',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'pl.jpg', // Replace with actual image URL
    rating: 4.0,
    category: 'Plumbing',
    numRatings: '15k'
  },
  {
    id: 7,
    title: 'Service 7',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.',
    image: 'bb.webp', // Replace with actual image URL
    rating: 4.8,
    category: 'Babysitting',
    numRatings: '15k'
  },
  {
    id: 8,
    title: 'Service 8',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'pl.jpg', // Replace with actual image URL
    rating: 4.0,
    category: 'Plumbing',
    numRatings: '15k'
  }
];


const ServiceList = ( ) => {
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
        <h2 className="text-xl font-medium font-sans mb-4 text-gray-600">Top Rated Services of the Month</h2>
        <div className="flex space-x-4">
          <select className="px-4 py-2 border rounded text-gray-500 text-sm w-64">
            <option value="" className="text-gray-500">All Regions</option>
            {/* Add options for regions */}
          </select>
          <select className="px-4 py-2 border rounded text-gray-500 text-sm w-64">
            <option value="" className="text-gray-500">All Categories</option>
            {/* Add options for categories */}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Display services for the current page */}
        {services.slice(startIndex, endIndex).map((service) => (
          <div key={service.id} className="border border-gray-200 rounded-lg ml-0 relative">
            <div className="pt-4">
              <img src={service.image} alt={service.title} className="w-80 h-56 object-cover mb-4 mx-auto mx-auto rounded" />
            </div>
            <div className="p-8 pt-4">
              <div className="mb-2 flex justify-between">
                <div className="mr-4 bg-blue-100 text-blue-700 py-1 px-2 rounded">
                  <span className="text-sm font-medium font-public-sans">{service.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="ml-1 font-bold">{service.rating.toFixed(1)} </span>
                  <span className="text-yellow-500 ml-1 text-xl">&#9733;</span>
                  <span className="text-gray-500 ml-2">({service.numRatings})</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 font-public-sans text-gray-600">
                {service.title}
              </h3>
              <p className="text-gray-700 mb-10">{service.description}</p>
              <button className="bg-green-300 hover:bg-green-400 text-white font-medium py-1 px-4 rounded w-full">
                View More
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
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={`bg-gray-200 py-2 px-4 rounded text-base font-medium ${currentPage === page ? 'bg-green-400 text-white' : 'hover:bg-gray-300'} mr-2`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

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

export default ServiceList;
