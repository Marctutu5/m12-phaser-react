import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Home from './pages/Home';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import AuthService from './auth/AuthService'; // Asegúrate de importar AuthService

function App() {
  const [authToken, setAuthToken] = useState(null);
  const [userName, setUserName] = useState(''); // Mantener el nombre del usuario

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
      loadUserData(storedToken); // Cargar datos del usuario al cargar la aplicación
    }
  }, []);

  const loadUserData = async (token) => {
    try {
      const userData = await AuthService.getUserInfo(token);
      setUserName(userData.user.name); // Suponiendo que la API devuelve un objeto 'user' con una propiedad 'name'
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const handleLoginSuccess = (response) => {
    const token = response.authToken;
    setAuthToken(token);
    localStorage.setItem('authToken', token);
    loadUserData(token); // Cargar los datos del usuario después de un inicio de sesión exitoso
  };

  const handleLogout = () => {
    AuthService.logout(authToken).catch(error => console.error('Logout failed:', error));
    setAuthToken(null);
    localStorage.removeItem('authToken');
    setUserName(''); // Limpiar el nombre del usuario
  };

  return (
    <Router>
      {authToken && <Header userName={userName} onLogout={handleLogout} />}
      <Routes>
        {authToken && <Route path="/" element={<Navigate to="/home" />} />}
        {!authToken && <Route path="/" element={<Navigate to="/login" />} />}
        <Route path="/home" element={<Home username={userName} />} />  {/* Aquí pasamos username a Home */}
        {!authToken && <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />}
        {authToken && <Route path="/login" element={<Navigate to="/home" />} />}
      </Routes>
      {authToken && <Footer />}
    </Router>
  );
}

export default App;
