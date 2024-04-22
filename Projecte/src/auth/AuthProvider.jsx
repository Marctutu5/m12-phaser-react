import React, { createContext, useContext, useState } from 'react';
import AuthService from './AuthService';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const userData = await AuthService.login(email, password);
      setUser(userData); // Guardar userData correctamente, considera almacenar el token aquí
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout(user?.token); // Manejar el caso donde user pueda ser null
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
