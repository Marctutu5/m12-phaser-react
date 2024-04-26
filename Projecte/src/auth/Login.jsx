import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import AuthService from './AuthService';
import { useNavigate } from 'react-router-dom';
import AuthToggle from './component/AuthToggle';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await AuthService.login(email, password);
      setLoading(false);
      localStorage.setItem('authToken', response.authToken);
      onLoginSuccess(response);
      navigate('/home');
    } catch (e) {
      setLoading(false);
      setError('Login Failed: ' + e.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="text-center">Login</h2>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin} disabled={loading} block>
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Log In'}
            </Button>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            <AuthToggle isRegisterView={false} /> {/* Botón para cambiar a la vista de registro */}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
