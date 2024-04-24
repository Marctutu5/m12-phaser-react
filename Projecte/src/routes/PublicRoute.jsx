// src/routes/PublicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, isAuthenticated }) => {
  if (isAuthenticated) {
    // Si está autenticado, redirigir a la página principal del juego o dashboard
    return <Navigate to="/game" replace />;
  }

  return children; // Renderizar los children si no está autenticado
};

export default PublicRoute;
