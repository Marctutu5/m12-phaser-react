import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './css/AuthToggle.css'; // Importa los estilos específicos para este componente

function AuthToggle({ isRegisterView }) {
  return (
    <Button variant="link" className="auth-toggle-button">
      {isRegisterView ? (
        <Link to="/login" className="auth-toggle-link">¿Ya tienes una cuenta? Iniciar sesión aquí</Link>
      ) : (
        <Link to="/register" className="auth-toggle-link">¿No tienes una cuenta? Regístrate aquí</Link>
      )}
    </Button>
  );
}

export default AuthToggle;
