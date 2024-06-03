import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';


const AdminAR = () => {
  const [approvalStatus, setApprovalStatus] = useState({});


  const [pending, setPendingProviders] = useState([]);
  const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchPendingProviders = async () => {
        try {
          const response = await fetch('http://localhost:3000/user/pending', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
  
          if (!response.ok) {
            console.error('Failed to fetch pending providers data');
            setError('Failed to fetch pending providers data');
            return;
          }
  
          const data = await response.json();
          console.log('Fetched Pending Providers:', data);
          setPendingProviders(data);
        } catch (error) {
          console.error('Fetching data failed:', error);
          setError('Fetching data failed');
        }
      };
  
      fetchPendingProviders();
    }, []);

    const handleApprove = async (id) => {
      const response = await fetch(`http://localhost:3000/user/approve/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
   setApprovalStatus({ ...approvalStatus, [id]: 'approved' });
   setTimeout(() => {
    setPendingProviders(pending.filter(provider => provider.id !== id));
  }, 600);
    
    };
    
  
    const handleReject = async (id) => {
      const response = await fetch(`http://localhost:3000/user/reject/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    setApprovalStatus({ ...approvalStatus, [id]: 'rejected' });
    setTimeout(() => {
      setPendingProviders(pending.filter(provider => provider.id !== id));
    }, 600);
    };
  

  return (
    <div className=" rounded-lg p-2 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {pending.map(provider => (
          <div key={provider.id} className="border border-gray-200  bg-white rounded-t-lg" style={{  width: '358.67px', height: '420px', boxShadow: '0px 4px 18px 0px rgba(75, 70, 92, 0.1)' }}>
            <div style={{ height: '75%', padding: 0, margin: 0 }}>
              <img src={provider.image} alt={provider.name} className="w-full h-full object-cover rounded-t-lg" style={{ margin: 0 }} />
            </div> 
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mt-5 ml-5 mb-3" style={{ width: '200px', height: '20px', lineHeight: '20px', textAlign: 'left', fontSize: '25px' }}>
                {provider.firstName} {provider.lastName}
                </p>
                <p className="text-gray-500 ml-5 mb-4" style={{ width: '200.67px', height: '22px', lineHeight: '20px', textAlign: 'left', fontSize: '19px' }}>
                  {provider.profession}
                </p>
              </div>
              <div className="flex items-center mt-8  ">
                {approvalStatus[provider.id] === 'approved' ? (
                  <p className="text-green-600 mr-8 " style={{ fontSize: '23px', fontWeight: '375' }}>Approved</p>
                ) : approvalStatus[provider.id] === 'rejected' ? (
                  <p className="text-red-600 mr-8 " style={{ fontSize: '23px', fontWeight: '380' }}>Rejected</p>
                ) : 
                (
                  <>
                    <button onClick={() => handleApprove(provider.id)} >
                      <img src="approve.svg" alt="icon1" className="w-8 h-9 mr-4" />
                    </button>
                    <button onClick={() => handleReject(provider.id)}>
                      <img src="reject.svg" alt="icon2" className="w-6 h-6 mr-3" />
                    </button>
                    <Link to={`/cv/${provider.id}`}>
                    <img src="profile1.svg" alt="icon3" className="w-9 h-7 mr-4" />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAR;
