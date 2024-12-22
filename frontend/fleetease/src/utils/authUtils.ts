import axios from 'axios';

export const getStoredToken = (): string | null => {
  return localStorage.getItem('token');
};

export const removeStoredToken = (): void => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};

export const isAuthenticated = (): boolean => {
  return !!getStoredToken();
};

