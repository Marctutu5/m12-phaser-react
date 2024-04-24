// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  let location = useLocation();

  if (!isAuthenticated) {
    // Redireccionar al login si no está autenticado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children; // Renderizar los children si el usuario está autenticado
};

export default ProtectedRoute;
