const API_URL = 'http://127.0.0.1:8000/api';

const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }), // Asegúrate de enviar "email" en lugar de "username"
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

const logout = async (token) => {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export default { login, logout };
