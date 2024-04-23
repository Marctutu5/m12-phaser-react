import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from './AuthService';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Intenta reestablecer el estado del usuario desde localStorage al recargar
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await AuthService.login(email, password);
      localStorage.setItem('user', JSON.stringify(userData)); // Guardar el usuario en localStorage
      setUser(userData);
    } catch (error) {
      throw new Error(error.message || 'Failed to login');
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout(user?.authToken);
      localStorage.removeItem('user'); // Limpiar el localStorage
      setUser(null);
    } catch (error) {
      throw new Error(error.message || 'Failed to logout');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
