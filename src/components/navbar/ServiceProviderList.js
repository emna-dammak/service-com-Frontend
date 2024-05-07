import React from 'react';

const ServiceProviders = [
  {
    id: 1,
    name: 'Habib Kallel',
    profession: 'Plumber',
    skills: ['Plumbing', 'Installation'],
    service_count: 5,
    orders: 61,
    rating: 4.2,
    image: 'Habib.png'
  },
  {
    id: 2,
    name: 'Eugenia Parsons',
    profession: 'Developer',
    skills: ['Vue.js', 'React'],
    service_count: 3,
    orders: 50,
    rating: 4.0,
    image: 'Eugenia.png'
  },
  {
    id: 3,
    name: 'Francis Byrd',
    profession: 'Developer',
    skills: ['HTML', 'Python'],
    service_count: 7,
    orders: 80,
    rating: 4.8,
    image: 'Francis.png'
  },
  {
    id: 4,
    name: 'Leon Lucas',
    profession: 'UI/UX Designer',
    skills: ['Figma', 'Photoshop', 'XD'],
    service_count: 3,
    orders: 30,
    rating: 3.7,
    image: 'Leon.png'
  },
  {
    id: 5,
    name: 'Jayden Rogers',
    profession: 'Full Stack Developer',
    skills: ['Vue.js', 'React', 'Angular'],
    service_count: 8,
    orders: 90,
    rating: 4.7,
    image: 'Jayden.png'
  },
  {
    id: 6,
    name: 'Jeanette Powell',
    profession: 'SEO',
    skills: ['Writing', 'Analysis'],
    service_count: 6,
    orders: 53,
    rating: 4.1,
    image: 'Jeanette.png'
  }
];

const ServiceProviderList = () => {
    return (
      <div className=" rounded-lg p-6 pt-8 pb-8 mb-4 font-sans">
        <h2 className="text-xl font-medium font-sans mb-4 text-gray-600 text-center bg-transparent" style={{fontSize:"24px", width: '1128px', height: '36px', gap: '10px'}}>
          Top Rated Service Providers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ServiceProviders.map(provider => (
           <div key={provider.id} className="border border-gray-200  p-4 bg-white" style={{  borderRadius: "5px",width: '358.67px', height: '420px', padding: '24px', gap: '20px',boxShadow: '0px 4px 18px 0px rgba(75, 70, 92, 0.1)' }}>
              <div className="flex items-center justify-center mb-4">
                <img src={provider.image} alt={provider.name} className="w-30 h-30 object-cover rounded-full border-4 border-white" />
              </div>
              
              <p className="text-gray-600 mb-2" style={{ width: '300px', height: '20px', lineHeight: '20px', textAlign: 'center',  fontSize: '22px' }}>
                {provider.name}
             </p>
              <p className="text-gray-500 mb-4" style={{ width: '310.67px', height: '22px', lineHeight: '20px', textAlign: 'center' }}>
                {provider.profession}
              </p>
              <div className="flex justify-center mb-5">
              {provider.skills.map(skill => (
              <span
              key={skill}
              className="text-xs py-1 px-2 rounded mr-2"
              style={{ backgroundColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
              color: `rgba(255, 255, 255, 1)`,
            }}
            > {skill}
            </span>
                ))}
              </div>

              <div className="flex justify-center"style={{ fontSize: '18px' }}>
               <div className="flex flex-col items-center mr-4" >
                <div className="text-gray-600  font-medium "style={{ fontSize: '20px' }} >{provider.service_count}</div>
                <div className="text-gray-500">Services</div>
               </div>
               <div className="flex flex-col items-center mr-6">
                <div className="text-gray-600 font-medium"style={{ fontSize: '20px' }} >{provider.orders}</div>
                <div className="text-gray-500">Orders</div>
               </div>
               <div className="flex flex-col items-center">
                <div className="text-gray-600  font-medium"style={{ fontSize: '20px' }} >{provider.rating}/5</div>
                <div className="text-gray-500">Rating</div>
              </div>
              </div>

              <div className="flex justify-center mt-4">
                <button className=" text-white font-bold py-2 px-1 flex items-center mr-3" style={{ borderRadius: "5px",width: '155px', height: '38px', boxShadow: '0px 2px 4px 0px rgba(165, 163, 174, 0.3)' ,background: "rgba(99, 196, 116, 1)"}}>
                  <img src="userinfo.svg" alt="User Icon" className="ml-auto"/>
                   <span className="mr-auto" >View Profile</span>
                   </button>
                <button className="  py-2 px-4 " style={{ borderRadius: "5px", width: '56px', height: '38px', background: "rgba(168, 170, 174, 0.16)" }}>
                 <img src="mail.svg" alt="Button Icon" />
                 </button>
                 </div>

            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ServiceProviderList;