const API_URL = 'http://127.0.0.1:8000/api';

const getToken = () => {
  const fullToken = localStorage.getItem('authToken');
  return fullToken ? fullToken.split('|')[1] : null;
};

const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
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

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
};

const logout = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Logout failed');
  }

  return data;
};

const getUserInfo = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/user`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user info');
  }

  return data;
};

const updateBackpack = async ( itemId, quantity) => {
  const url = `${API_URL}/backpack/update`;
  const token = getToken();
  const data = {
      item_id: itemId,
      quantity: quantity
  };
  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
  };

  try {
      const response = await fetch(url, options);
      if (response.ok) {
          const responseData = await response.json();
          console.log('Respuesta del servidor:', responseData);
      } else {
          console.error('Error al enviar la solicitud:', response.status);
      }
  } catch (error) {
      console.error('Error al procesar la solicitud:', error);
  }
}

export default { login, register, logout, getUserInfo, updateBackpack };
