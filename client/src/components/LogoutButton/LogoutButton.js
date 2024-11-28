import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import NavButton from '../common/NavButton/NavButton.js';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext); // Access the logout function from context
  const navigate = useNavigate(); // For navigation after logout

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate('/'); // Redirect to the home page (or login page if needed)
  };


  return (
    <NavButton onClick={handleLogout}>LogOut</NavButton>
  );
};

export default LogoutButton;
