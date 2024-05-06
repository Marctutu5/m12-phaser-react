// src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './pages/home/Home';
import Backpack from './pages/backpack/Backpack';
import Market from './pages/market/Market';
import MarketBuy from './pages/market/MarketBuy';
import MarketSell from './pages/market/MarketSell';
import MarketManage from './pages/market/MarketManage';
import MarketTransaction from './pages/market/MarketTransaction';
import Fissurials from './pages/fissurials/Fissurials';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { PhaserGame } from './game/PhaserGame';
import AuthService from './auth/AuthService';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userName, setUserName] = useState(''); // Agregado para almacenar el nombre del usuario
  useEffect(() => {
    if (authToken) {
      loadUserData(authToken);
    }
  }, [authToken]);

  const loadUserData = async (token) => {
    try {
      const userData = await AuthService.getUserInfo(token);
      setUserName(userData.user.name);
    } catch (error) {
      console.error('Failed to load user data:', error);
      handleLogout();
    }
  };

  const handleLoginSuccess = (response) => {
    setAuthToken(response.authToken);
    localStorage.setItem('authToken', response.authToken);
  };

  const handleLogout = () => {
    AuthService.logout(authToken).catch(console.error);
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <Router>
      {authToken && <Header userName={userName} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Navigate to={authToken ? "/game" : "/login"} />} />
        <Route path="/login" element={<PublicRoute isAuthenticated={!!authToken}><Login onLoginSuccess={handleLoginSuccess} /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute isAuthenticated={!!authToken}><Register onLoginSuccess={handleLoginSuccess} /></PublicRoute>} />
        <Route path="/game" element={<ProtectedRoute isAuthenticated={!!authToken}><PhaserGame  /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute isAuthenticated={!!authToken}><Home userName={userName} /></ProtectedRoute>} />
        <Route path="/backpack" element={<ProtectedRoute isAuthenticated={!!authToken}><Backpack userName={userName} /></ProtectedRoute>} />
        <Route path="/market" element={<ProtectedRoute isAuthenticated={!!authToken}><Market /></ProtectedRoute>}>
          <Route index element={<Navigate replace to="buy" />} />
          <Route path="buy" element={<MarketBuy />} />
          <Route path="sell" element={<MarketSell />} />
          <Route path="manage" element={<MarketManage />} />
          <Route path="transaction" element={<MarketTransaction />} />
        </Route>
        <Route path="/fissurials" element={<ProtectedRoute isAuthenticated={!!authToken}><Fissurials userName={userName} /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
