import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AuthToggle({ isRegisterView }) {
  return (
    <Button variant="link">
      {isRegisterView ? (
        <Link to="/login">¿Ya tienes una cuenta? Iniciar sesión aquí</Link>
      ) : (
        <Link to="/register">¿No tienes una cuenta? Regístrate aquí</Link>
      )}
    </Button>
  );
}

export default AuthToggle;
