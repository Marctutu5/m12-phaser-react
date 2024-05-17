import React, { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import AuthService from './AuthService';
import AuthToggle from './component/AuthToggle';
import { useNavigate } from 'react-router-dom';
import './css/Register.css'; // Agrega el archivo CSS de estilos

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    if (password.length < 9) {
      setError('La contraseña debe tener al menos 9 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await AuthService.register(name, email, password);
      setShowSuccessModal(true);
    } catch (error) {
      setError(error.message || 'Error al registrar el usuario.');
    }
    setLoading(false);
  };

  const handleToggle = () => {
    navigate('/login'); // Redirige a la página de inicio de sesión
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/login');
  };

  return (
    <div className="full-page">
      <div className="register-container">
        <h2 className="text-center text-neon-green font-orbitron">Registro</h2>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label className="text-neon-green">Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="bg-dark text-neon-green border-neon-green"
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="mt-2 text-neon-green">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="bg-dark text-neon-green border-neon-green"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="mt-2 text-neon-green">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="bg-dark text-neon-green border-neon-green"
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleRegister}
            disabled={loading}
            block
            className="mt-4 bg-neon-green text-dark border-neon-green"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          <AuthToggle isRegisterView={true} /> {/* Botón para cambiar a la vista de inicio de sesión */}
        </Form>
      </div>
      <Modal show={showSuccessModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registro Exitoso</Modal.Title>
        </Modal.Header>
        <Modal.Body>¡Usuario registrado correctamente!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Register;
