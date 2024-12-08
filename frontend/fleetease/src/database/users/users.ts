import axios from 'axios';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  // Add other user properties as needed
}

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await axios.get('/api/users');
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  },

  create: async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await axios.post('/api/users', user);
    return response.data;
  },

  update: async (id: number, user: Partial<User>): Promise<User> => {
    const response = await axios.put(`/api/users/${id}`, user);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`/api/users/${id}`);
  }
};

