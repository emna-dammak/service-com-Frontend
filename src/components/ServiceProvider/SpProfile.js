import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const SpProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  const maxPerPage = 2; // Maximum number of services per page
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
  
  useEffect(() => {
    const fetchServiceProvider = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/service-providers/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          console.error('Failed to fetch service provider data');
          setError('Failed to fetch service provider data');
          return;
        }

        const data = await response.json();
        console.log('Fetched Service Provider:', data);
        setProvider(data[0]);
        const serviceIds = data[0]?.skills?.split(', ').map(skill => skill.split(':')[0]);
        if (serviceIds?.length) {
          const serviceResponses = await Promise.all(serviceIds.map(serviceId =>
            fetch(`http://localhost:3000/service/${serviceId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            })
          ));
          const servicesData = await Promise.all(serviceResponses.map(res => res.json()));

          // Fetch ratings for each service
          const servicesWithRatings = await Promise.all(servicesData.map(async (service) => {
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
          }));

          setServices(servicesWithRatings);
        }
        


      } catch (error) {
        console.error('Fetching data failed:', error);
        setError('Fetching data failed');
      }
    };
    

    fetchServiceProvider();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!provider) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-lg font-sans min-h-screen" >
      <div key={provider.id} style={{ flex:1, borderRadius: "5px", padding: '24px', gap: '20px', boxShadow: '0px 4px 18px 0px rgba(75, 70, 92, 0.1)', minHeight: '660px', display: 'flex', backgroundColor:"rgba(241, 249, 243, 0.8)"}}>
        <div style={{ width:"47%", backgroundColor:"rgba(231, 240, 233, 0.8)", border:'2px solid rgba(63, 106, 73, 0.8)', borderRadius: '10px' }}>
          <div className="flex justify-left mb-1">
            <p className=" ml-5 mt-9 mb-4  " style={{ width: '300px', height: '20px', lineHeight: '20px', textAlign: 'left', fontSize: '33px', fontWeight:"bold", fontFamily:"Arial", color:"rgba(44, 138, 65, 0.8)"}}>
              Service Provider
            </p>
          </div>
          <div className="flex items-start mt-6 mb-5">
            <div className="ml-5">
              <p className="text-gray-800 mb-10 mt-5" style={{ width: '270px', height: '20px', lineHeight: '20px', textAlign: 'left', fontSize: '33px', fontWeight: 'bold', fontFamily: 'Century Gothic' }}>
                {provider.firstName} {provider.lastName}               
              </p>
              <p className="text-gray-800 mb-5 " style={{ width: '270px', height: '20px', lineHeight: '20px', textAlign: 'left', fontSize: '28px', fontWeight: 'bold', fontFamily: 'Trebuchet MS' }}>
                Profession : 
              </p>
              <p className="text-gray-700 mb-8" style={{ lineHeight: '20px', textAlign: 'left', fontSize: '25px',fontFamily: 'Trebuchet MS' }}>
                {provider.profession}
              </p>
              <p className="text-gray-800 mb-6 " style={{ width: '270px', height: '20px', lineHeight: '20px', textAlign: 'left', fontSize: '28px', fontWeight: 'bold', fontFamily: 'Trebuchet MS' }}>
                Rating :  <span className="text-gray-700"> {provider.averageRating}  <img src="/star.svg" alt="icon1" className="inline-block w-6 mb-2 ml-1" /></span>         
              </p>
            </div>
            <div className="flex items-center">
              <img src={`/${provider.profileImagePath}`} alt={provider.firstName} style={{ width: '190px', height: 'auto' }} className="rounded-lg" />
            </div>
          </div>
          <div className="flex items-start mb-12" >
            <div className="ml-5">
              <p className='mb-4' style={{ fontSize: '33px', fontFamily:"Arial", fontWeight:"bold",color:"rgba(8, 81, 15, 0.8)" }}>Services :</p>
              {provider.skills && provider.skills.split(', ').map(skill => {
              const title = skill.split(':')[1];
              return (
              <div key={skill} className="flex items-center mb-5">
                <p className="text-gray-800" style={{ width: '170px', lineHeight: '20px', textAlign: 'left', fontSize: '29px', fontFamily: 'Trebuchet MS' }}>
                 {title}
               </p>
            </div>
             );
            })}

            </div>
          </div>
        </div>
      <div style={{ flex: 2 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6" >
        {services.slice(startIndex, endIndex).map((service) => (

          <div key={service.id} className="border border-gray-200 rounded-lg ml-0 relative">
            <div className="pt-4">
              <img src={`/${service.imagePath}`} alt={service.title} className="w-80 h-56 object-cover mb-4 mx-auto mx-auto rounded" />
            </div>
            <div className="p-8 pt-4">
              <div className="mb-2 flex justify-between">
                <div className="mr-4 bg-blue-100 text-blue-700 py-1 px-2 rounded">
                  <span className="text-sm font-medium font-public-sans">{service.profession.category.title}</span>
                </div>
                <div className="flex items-center">
                  <span className="ml-1 font-bold">{service.avgRating ? service.avgRating.toFixed(1) : 'N/A'} </span>
                  <span className="text-yellow-500 ml-1 text-xl">&#9733;</span>
                  <span className="text-gray-500 ml-2">({service.ratingCount || 'N/A'})</span>
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
     </div>
      
      
    </div>
  );
};

export default SpProfile;
