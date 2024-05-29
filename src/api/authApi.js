import axios from 'axios';

const API_URL = '/api/auth';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const register = async (adminName, email, password, role) => {
  const response = await axios.post(`${API_URL}/register`, { adminName, email, password, role });
  return response.data;
};
