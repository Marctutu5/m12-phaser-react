import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import AuthService from './AuthService';
import AuthToggle from './component/AuthToggle';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    setLoading(true);
    try {
      await AuthService.register(name, email, password);
      // Si el registro es exitoso, puedes redirigir al usuario a la página de inicio de sesión o mostrar un mensaje de éxito.
      console.log('Registro exitoso');
    } catch (error) {
      setError(error.message || 'Error al registrar el usuario.');
    }
    setLoading(false);
  };

  const handleToggle = () => {
    navigate('/login'); // Redirige a la página de registro
  };

  return (
    <Container style={{ maxWidth: '400px', marginTop: '50px' }}>
      <h2 className="text-center">Registro</h2>
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleRegister}
          disabled={loading}
          block
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </Button>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        <AuthToggle isRegisterView={true} /> {/* Botón para cambiar a la vista de inicio de sesión */}
      </Form>
    </Container>
  );
}

export default Register;
