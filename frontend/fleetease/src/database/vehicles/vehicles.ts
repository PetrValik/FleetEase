import axios from 'axios';

export interface MaintenanceEvent {
  id: number;
  eventType: string; // e.g., "Routine Check", "Defect Report", etc.
  date: string; // ISO 8601 formatted date string, or any date format you prefer
  description: string; // Detailed description of the event
  reportedBy: string; // Name of the person who reported the event (optional)
}

export interface Vehicle {
  id: number;
  vehicleType: string;
  brand: string;
  model: string;
  year: number;
  registrationNumber: string;
  vin: string;
  color: string;
  status: "Available" | "In Use" | "Maintenance" | "Disabled"; // This will be restricted to these values
  capacity: string;
  fuelType: string;
  enginePower: string;
  maxSpeed: string;
  equipment: string;
  owner: string;
  driver?: string;  // Optional field (if applicable)
  assignmentPeriod?: string;  // Optional field (if applicable)
  maintenanceHistory: MaintenanceEvent[];
}

export const vehiclesApi = {
  getAll: async (): Promise<Vehicle[]> => {
    try {
      const response = await axios.get('/api/vehicles');
      console.log('Fetched vehicles data:', response.data);  // Log the response from the API
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
  },

  getById: async (id: number): Promise<Vehicle> => {
    try {
      const response = await axios.get(`/api/vehicles/${id}`);
      console.log(`Fetched vehicle with ID ${id}:`, response.data);  // Log the specific vehicle data
      return response.data;
    } catch (error) {
      console.error(`Error fetching vehicle with ID ${id}:`, error);
      throw error;
    }
  },

  create: async (vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
    try {
      const response = await axios.post('/api/vehicles', vehicle);
      console.log('Created vehicle:', response.data);  // Log the newly created vehicle
      return response.data;
    } catch (error) {
      console.error('Error creating vehicle:', error);
      throw error;
    }
  },

  update: async (id: number, vehicle: Partial<Vehicle>): Promise<Vehicle> => {
    try {
      const response = await axios.put(`/api/vehicles/${id}`, vehicle);
      console.log(`Updated vehicle with ID ${id}:`, response.data);  // Log the updated vehicle
      return response.data;
    } catch (error) {
      console.error(`Error updating vehicle with ID ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await axios.delete(`/api/vehicles/${id}`);
      console.log(`Deleted vehicle with ID ${id}`);  // Log the deletion action
    } catch (error) {
      console.error(`Error deleting vehicle with ID ${id}:`, error);
      throw error;
    }
  }
};