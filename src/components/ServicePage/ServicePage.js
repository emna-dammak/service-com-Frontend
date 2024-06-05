import React, { useState, useEffect } from "react";
import ServiceDetails from "./ServiceDetails";
import Comments from "./Comments";
import OtherServices from "./OtherServices";
import { useLocation } from "react-router-dom";

const API_URL = process.env.REACT_APP_SERVER_URL;

const ServicePage = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [currentService, setCurrentService] = useState(null); 


  const location = useLocation();
  const {
    service,
    relatedServices = [],
    allServices = [],
  } = location.state || {};

  const updateCurrentService = (updatedService) => {
    setCurrentService(updatedService);
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await fetch(`${API_URL}user/auth`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();
        setUser(userData);
        console.log("User data fetched:", userData);
      } catch (error) {
        console.error("Fetching data failed:", error);
        setError("Fetching data failed");
      }
    };

    fetchUser();

    setCurrentService(service);

  }, [service]);


  return (
    <div className="flex flex-col md:flex-row p-4 bg-emerald-50 min-h-screen">
      <div className="w-full md:w-1/3">
        {currentService && <ServiceDetails service={currentService} updateCurrentService={updateCurrentService} user={user}/>}
      </div>
      <div className="w-full md:w-2/3 flex flex-col p-2 space-y-4 ">
        <div className="flex-grow">
          {user ? (
            <Comments serviceId={service.id} user={user} />
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
        <div className="flex-none pl-4">
          <OtherServices
            ServiceProvider={
              service.profession.user.firstName +
              " " +
              service.profession.user.lastName
            }
            services={relatedServices}
            AllServices={allServices}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
