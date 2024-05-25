import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigateTo = useNavigate();

  useEffect(() => {
    const logout = async () => {
      await axios.delete('http://localhost:3000/logout', { withCredentials: true });
      navigateTo('/login');
    };

    logout();
  }, [navigateTo]);

  return <div>Logging out...</div>;
};

export default Logout;