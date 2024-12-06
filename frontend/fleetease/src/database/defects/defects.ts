import axios from 'axios';

interface Defect {
  id: number;
  description: string;
  // Add other defect properties as needed
}

export const defectsApi = {
  getAll: async (): Promise<Defect[]> => {
    const response = await axios.get('/api/defects');
    return response.data;
  },

  getById: async (id: number): Promise<Defect> => {
    const response = await axios.get(`/api/defects/${id}`);
    return response.data;
  },

  create: async (defect: Omit<Defect, 'id'>): Promise<Defect> => {
    const response = await axios.post('/api/defects', defect);
    return response.data;
  },

  update: async (id: number, defect: Partial<Defect>): Promise<Defect> => {
    const response = await axios.put(`/api/defects/${id}`, defect);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`/api/defects/${id}`);
  }
};

