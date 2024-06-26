import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:3000/authenticated', {
          withCredentials: true,
        });
        setAuthenticated(response.data.authenticated);
      } catch (error) {
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  return authenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
