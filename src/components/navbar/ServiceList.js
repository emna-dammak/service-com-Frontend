// ServiceList.js
import React from 'react';

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
];

const ServiceList = () => {
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
        {services.map(service => (
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
      </div>
    );
  };
  
  export default ServiceList;