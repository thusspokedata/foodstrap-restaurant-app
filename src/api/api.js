import axios from 'axios';

export const login = (email, password) => {
  const requestBody = {
    email,
    password,
  };

  return axios
    .post('/api/restaurant/login', requestBody)
    .then((response) => response.data)
    .catch((err) => {
      throw err.response.data.message;
    });
};

export const getProducts = () => {
  const storedToken = localStorage.getItem('authToken');

  return axios
    .get('/api/products', {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => response.data)
    .catch((err) => {
      throw err.response.data.message;
    });
};

export const getClient = (id) => {
  const storedToken = localStorage.getItem('authToken');

  return axios
    .get(`/api/auth/${id}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => response.data)
    .catch((err) => {
      throw err.response.data.message;
    });
};

export const postOrder = (client) => {
  const storedToken = localStorage.getItem('authToken');
  const requestBody = {
    client: client._id,
    username: client.username,
    email: client.email,
  };

  return axios
    .post('/api/order/bill', requestBody, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => response.data)
    .catch((err) => {
      throw err.response.data.message;
    });
};

export function getTables(adminRestoId) {
  const storedToken = localStorage.getItem('authToken');

  return axios
    .get(`/api/resto/restaurant/admin/${adminRestoId}?timestamp=${Date.now()}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => response.data)
    .catch((err) => {
      throw err.response.data.message;
    });
}
