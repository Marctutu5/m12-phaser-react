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

const getWallet = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/wallet`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch wallet data');
  }

  return data;
};

const getBackpack = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/backpack`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch backpack data');
  }

  return data;
};

const getPosition = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/user-position`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      console.error('Failed to fetch position data');
      return null;
  }

  // Intentar analizar la respuesta JSON
  try {
      const positionData = await response.json();
      return positionData;
  } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
  }
};

const updatePosition = async (x, y, scene) => {
  const url = `${API_URL}/user-position`;
  const token = getToken();
  const data = {
      x: x,
      y: y,
      scene: scene
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





export default { login, register, logout, getUserInfo, updateBackpack, getWallet, getBackpack, getPosition, updatePosition };
