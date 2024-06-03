import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Services = () => {
  const [services, setServices] = useState([]);
  const [AllServices, setAllServices] = useState([]);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

        setAllServices(servicesWithRatings);
        const lastThreeServices = servicesWithRatings.slice(-3).reverse();
        setServices(lastThreeServices);

      } catch (error) {
        console.error('Fetching data failed:', error);
        setError('Fetching data failed');
      }
    };

    fetchServices();
  }, []);


  const handleViewMore = (service) => {
    const relatedServices = AllServices.filter(s => s.profession.user.id === service.profession.user.id && s.id !== service.id);
    navigate(`/service/${service.id}`, { state: { service, relatedServices, allServices: AllServices } });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-16">
      <h2 className="text-lg text-gray-600 mb-2">Connecting You To Trusted Professionals!</h2>
      <h3 className="text-3xl font-bold text-gray-900 mb-8">
        Recently Posted <span className="text-teal-500">Services</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Display services for the current page */}
        {services.map((service) => (
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
    </div>
  );
};

export default Services;
