import React, { useState } from 'react';
import AuthService from './AuthService';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(email, password);
      onLoginSuccess(response.data); // Asegúrate de manejar correctamente "response.data"
    } catch (e) {
      setError('Login Failed: ' + e.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email" // Cambiar type a "email" para validación automática
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Log In</button>
      {error && <div>{error}</div>}
    </div>
  );
}

export default Login;
