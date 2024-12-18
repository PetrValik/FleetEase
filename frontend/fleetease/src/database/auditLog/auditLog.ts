import axios from 'axios';

interface Insurance {
  id: number;
  policyNumber: string;
  // Add other insurance properties as needed
}

export const insurancesApi = {
  getAll: async (): Promise<Insurance[]> => {
    const response = await axios.get('/api/insurances');
    return response.data;
  },

  getById: async (id: number): Promise<Insurance> => {
    const response = await axios.get(`/api/insurances/${id}`);
    return response.data;
  },

  create: async (insurance: Omit<Insurance, 'id'>): Promise<Insurance> => {
    const response = await axios.post('/api/insurances', insurance);
    return response.data;
  },

  update: async (id: number, insurance: Partial<Insurance>): Promise<Insurance> => {
    const response = await axios.put(`/api/insurances/${id}`, insurance);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`/api/insurances/${id}`);
  }
};

