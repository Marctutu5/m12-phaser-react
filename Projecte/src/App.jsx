import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Home from './pages/Home';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

function App() {
  const [authToken, setAuthToken] = useState(null);

  // Al cargar la aplicación, intenta obtener el token de sesión guardado en el almacenamiento local
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  // Función para manejar el éxito del inicio de sesión y guardar el token en el estado y en el almacenamiento local
  const handleLoginSuccess = (response) => {
    const token = response.authToken;
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  // Función para cerrar sesión y eliminar el token del estado y del almacenamiento local
  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <Router>
      {authToken && <Header />}
      <Routes>
        {/* Redirigir a la página principal si hay un token de sesión */}
        {authToken && <Route path="/" element={<Navigate to="/home" />} />}
        
        {/* Redirigir a la página de inicio de sesión si no hay un token de sesión */}
        {!authToken && <Route path="/" element={<Navigate to="/login" />} />}
        
        {/* Componente Home */}
        <Route path="/home" element={<Home authToken={authToken} onLogout={handleLogout} />} />
        
        {/* Componente Login (Solo muestra si no hay un token de sesión) */}
        {!authToken && <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />}
        
        {/* Redirigir a la página principal si se intenta acceder a /login con un token de sesión */}
        {authToken && <Route path="/login" element={<Navigate to="/home" />} />}
      </Routes>
      {authToken && <Footer />}
    </Router>
  );
}

export default App;
