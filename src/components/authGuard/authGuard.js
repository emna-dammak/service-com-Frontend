import React from 'react';
import useAuth from './useAuth'; // Assuming the custom hook is in the same directory
import Loading from './loading.js';

const AuthGuard = ({ children }) => {
    const isAuthenticated = useAuth();

    if (isAuthenticated === false) {
        return <Loading></Loading>; // or any loading indicator
    }

    return isAuthenticated ? children : null;
};

export default AuthGuard;
