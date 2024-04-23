import React, { useState } from 'react';
import AuthService from './AuthService';
import { useNavigate } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para navegar

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await AuthService.login(email, password);
      setLoading(false);
      console.log('Token:', response.authToken); // Mostrar el token en la consola
      onLoginSuccess(response); // Llamar al callback de éxito
      navigate('/game'); // Redirigir a la página deseada, ajusta la ruta según necesites
    } catch (e) {
      setLoading(false);
      setError('Login Failed: ' + e.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        disabled={loading}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        disabled={loading}
      />
      <button onClick={handleLogin} disabled={loading}>Log In</button>
      {loading && <p>Loading...</p>}
      {error && <div>{error}</div>}
    </div>
  );
}

export default Login;
