import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('userEmail'); // Check if admin is logged in

  return isAuthenticated ? children : <Navigate to="/adminlogin" />;
};

export default PrivateRoute;
