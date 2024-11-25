// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const userCache = localStorage.getItem("User");

  if (!userCache) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
