import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PublicRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:3000/authenticated', {
          withCredentials: true,
        });
        setAuthenticated(response.data.authenticated);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle 401 error silently
          setAuthenticated(false);
        } else {
          // Optionally handle other errors differently
          setAuthenticated(false);
        }
      }
    };

    checkAuthentication();
  }, []);

  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  return authenticated ? <Navigate to="/projects" /> : children;
};

export default PublicRoute;
