import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './auth/AuthProvider';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PayPalScriptProvider options={{ clientId: "Ab5GwyG8wvMnKsyt4NCOsNerorJe9cfQmQT5Gsu30dgWbqGk8-bZcYQyq14iBBgtEghejOVRbxzJ67b1" }}>
        <App />
      </PayPalScriptProvider>
    </AuthProvider>
  </React.StrictMode>
);
