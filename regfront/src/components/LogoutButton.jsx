import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Toolbar } from '@mui/material';
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
    <Toolbar>
      <Button color="info" variant='contained' onClick={handleLogout}>Logout</Button>
    </Toolbar>
  );
};

export default LogoutButton;
