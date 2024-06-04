import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const checkAuth =async () => {
            try {
                const response = await fetch('http://localhost:3000/user/auth', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                if (response.status === 401) {
                    setIsAuthenticated(false);

                    navigate('/login');
                   


                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Failed to check auth', error);
                setIsAuthenticated(false);
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]);

    return isAuthenticated;
};

export default useAuth;
