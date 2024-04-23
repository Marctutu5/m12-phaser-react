const API_URL = 'http://127.0.0.1:8000/api';

const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json(); // Capturar la respuesta como JSON
  if (!response.ok) {
    throw new Error(data.message || 'Login failed'); // Usar el mensaje del servidor si está disponible
  }

  return data;
};

const register = async (name, email, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json(); // Capturar la respuesta como JSON
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed'); // Usar el mensaje del servidor si está disponible
  }

  return data;
};

const logout = async (token) => {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json(); // Capturar la respuesta como JSON
  if (!response.ok) {
    throw new Error(data.message || 'Logout failed'); // Usar el mensaje del servidor si está disponible
  }

  return data;
};

export default { login, register, logout };
