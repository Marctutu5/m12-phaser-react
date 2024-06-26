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

const getCollectedItems = async () => {
    const token = getToken();
    try {
        const response = await fetch(`${API_URL}/usercollecteditems`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch collected items');
            return null;
        }

        // Intentar analizar la respuesta JSON
        const collectedItems = await response.json();
        return collectedItems;
    } catch (error) {
        console.error('Error fetching collected items:', error);
        return null;
    }
};

const storeCollectedItem = async (itemId) => {
  const token = getToken();
  try {
      const response = await fetch(`${API_URL}/usercollecteditems`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              map_item_id: itemId
          })
      });

      if (!response.ok) {
          console.error('Failed to store collected item');
          return null;
      }

      // Intentar analizar la respuesta JSON
      const storedItem = await response.json();
      return storedItem;
  } catch (error) {
      console.error('Error storing collected item:', error);
      return null;
  }
};


const getMapItemCords = async () => {
  const token = getToken();
  try {
      const response = await fetch(`${API_URL}/mapitems`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          console.error('Failed to fetch collected mapitems');
          return null;
      }

      // Intentar analizar la respuesta JSON
      const MapItemCords = await response.json();
      return MapItemCords;
  } catch (error) {
      console.error('Error fetching collected items:', error);
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

const createListing = async (item_id, quantity, price) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/listings`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id, quantity, price }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create listing');
  }
  return data;
};

const getListings = async (excludeOwn = false) => {
  const token = getToken();
  const url = `${API_URL}/listings${excludeOwn ? '?exclude_own=true' : ''}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch listings');
  }
  return data;
};


const getListing = async (id) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/listings/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Listing not found');
  }
  return data;
};

const cancelListing = async (id) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/listings/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to cancel listing');
  }
  return data;
};

const createTransaction = async (listing_id, quantity) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ listing_id, quantity }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create transaction');
  }
  return data;
};

const getTransactions = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/transactions`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch transactions');
  }
  return data;
};

const getUserFissurial = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/user-fissurial`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user fissurial data');
  }
  return data;
};

const getUserFissurials = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/user-fissurials`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user fissurial data');
  }
  return data;
};


const getFissurials = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/fissurials`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  console.log('Fissurials data:', data); // Imprime la respuesta
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch fissurials data');
  }
  return data;
};


const getFissurialById = async (id) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/fissurials/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch fissurial data');
  }
  return data;
};

const getAttacks = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/attacks`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch attacks data');
  }
  return data;
};

const getAttackById = async (id) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/attacks/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch attack data');
  }
  return data;
};

const getFissurialAttacksByFissurial = async (fissurialId) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/fissurial-attacks/fissurial/${fissurialId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch fissurial attacks data');
  }
  return data;
};

const getFissurialAttacksByAttack = async (attackId) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/fissurial-attacks/attack/${attackId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch attack data');
  }
  return data;
};

const updateWallet = async (coins) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/wallet/update`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coins })
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to update wallet');
  }

  return await response.json();
};

const recordRecharge = async (transactionDetails) => {
  const token = getToken();
  console.log('Sending recharge details:', transactionDetails); // Debugging output
  const response = await fetch(`${API_URL}/recharges`, {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionDetails)
  });

  if (!response.ok) {
      const data = await response.json();
      console.error('Failed to record recharge:', data); // Debugging output
      throw new Error(data.message || 'Failed to record recharge');
  }

  const data = await response.json();
  console.log('Recharge recorded successfully:', data); // Debugging output
  return data;
};

const getRecharges = async () => {
  const token = getToken();
  const response = await fetch(`${API_URL}/recharges`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
      },
  });

  const data = await response.json();
  if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch recharges');
  }

  return data;
};

export default {
  login,
  register,
  logout,
  getUserInfo,
  updateBackpack,
  getWallet,
  getBackpack,
  createListing,
  getListings,
  getListing,
  cancelListing,
  createTransaction,
  getTransactions,
  getPosition,
  updatePosition,
  getCollectedItems,
  getMapItemCords,
  storeCollectedItem,
  getUserFissurial,
  getFissurials,
  getFissurialById,
  getAttacks,
  getAttackById,
  getFissurialAttacksByFissurial,
  getFissurialAttacksByAttack,
  getUserFissurials,
  updateWallet,
  recordRecharge,
  getRecharges
};


