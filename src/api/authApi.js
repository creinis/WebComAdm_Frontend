import axios from 'axios';

/* const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`; */

export const login = async (email, password) => {
  const response = await axios.post(`/login`, { email, password });
  return response.data;
};

export const register = async (adminName, email, password, role) => {
  const response = await axios.post(`/register`, { adminName, email, password, role });
  return response.data;
};
