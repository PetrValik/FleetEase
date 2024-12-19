import apiClient from '../../utils/apiClient';

interface Defect {
  id: number;
  description: string;
  // Add other defect properties as needed
}

export const defectsApi = {
  getAll: async (): Promise<Defect[]> => {
    const response = await apiClient.get('/api/defects');
    return response.data;
  },

  getById: async (id: number): Promise<Defect> => {
    const response = await apiClient.get(`/api/defects/${id}`);
    return response.data;
  },

  create: async (defect: Omit<Defect, 'id'>): Promise<Defect> => {
    const response = await apiClient.post('/api/defects', defect);
    return response.data;
  },

  update: async (id: number, defect: Partial<Defect>): Promise<Defect> => {
    const response = await apiClient.put(`/api/defects/${id}`, defect);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/defects/${id}`);
  }
};

