import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid } from '@mui/material';
import axios from 'axios';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:3000/logout', { withCredentials: true });
      navigate('/');
    } catch (err) {
      console.error('Error logging out', err);
    }
  };

  if(window.location.pathname === '/logout') {
    handleLogout();
  }

  //if user is logged out, dont show logout button
  if (window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/') {
    return null;
  }

  return (
      <Button color="info" variant='contained' size='small' onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;
