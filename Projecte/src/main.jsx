import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './auth/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router> {/* Envuelve tu aplicación en el Router */}
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
