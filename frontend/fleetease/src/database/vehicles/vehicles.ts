import axios from 'axios';

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  // Add other vehicle properties as needed
}

export const vehiclesApi = {
  getAll: async (): Promise<Vehicle[]> => {
    const response = await axios.get('/api/vehicles');
    return response.data;
  },

  getById: async (id: number): Promise<Vehicle> => {
    const response = await axios.get(`/api/vehicles/${id}`);
    return response.data;
  },

  create: async (vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
    const response = await axios.post('/api/vehicles', vehicle);
    return response.data;
  },

  update: async (id: number, vehicle: Partial<Vehicle>): Promise<Vehicle> => {
    const response = await axios.put(`/api/vehicles/${id}`, vehicle);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`/api/vehicles/${id}`);
  }
};

