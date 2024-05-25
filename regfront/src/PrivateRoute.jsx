import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const auth = document.cookie.includes('_your_app_session'); // Tarkista sessioeväste
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;