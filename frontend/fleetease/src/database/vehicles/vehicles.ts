import axios from 'axios';
import { config } from '../../config';

const BASE_URL = config.VEHICLES_ENDPOINT;

// Interface for vehicle response
export interface Vehicle {
  vehicle_id: number;
  model_id: number;
  registration_number: string;
  vin: string;
  category_id: number;
  country_id: number;
  fuel_type: string;
  vehicle_status: string;
  created_at: string;
  company_id: number;
}

// Get all vehicles
export const getAllVehicles = async (): Promise<Vehicle[]> => {
  try {
    const response = await axios.get<Vehicle[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all vehicles:', error);
    throw new Error('Failed to fetch all vehicles');
  }
};

// Get a single vehicle by ID
export const getVehicleById = async (id: number): Promise<Vehicle> => {
  try {
    const response = await axios.get<Vehicle>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching vehicle with ID ${id}:`, error);
    throw new Error('Failed to fetch vehicle');
  }
};

// Create a new vehicle
export const createVehicle = async (company_id: number ,vehicleData: Omit<Vehicle, 'vehicle_id' | 'created_at'>): Promise<Vehicle> => {
  try {
    vehicleData.company_id = company_id;
    const response = await axios.post<Vehicle>(`${BASE_URL}`, vehicleData);
    return response.data;
  } catch (error) {
    console.error('Error creating vehicle:', error);
    throw new Error('Failed to create vehicle');
  }
};

// Update a vehicle
export const updateVehicle = async (
  id: number,
  updatedData: Partial<Omit<Vehicle, 'vehicle_id' | 'created_at'>>
): Promise<Vehicle> => {
  try {
    const response = await axios.put<Vehicle>(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating vehicle with ID ${id}:`, error);
    throw new Error('Failed to update vehicle');
  }
};

// Delete a vehicle
export const deleteVehicle = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting vehicle with ID ${id}:`, error);
    throw new Error('Failed to delete vehicle');
  }
};
