import { config } from '../../config';
import apiClient from '../../utils/apiClient';
import { handleApiError } from '../../utils/apiErrorHandler';

const BASE_URL = config.VEHICLES_ENDPOINT;

// Interface for vehicle response
export interface Vehicle {
  vehicle_id: number;
  model_id: number;
  registration_number: string;
  vin: string;
  category_id: number;
  country_id: number;
  fuel_type: 'Diesel' | 'Natural 95' | 'Natural 98' | 'Electric' | 'Hybrid' | 'Plug-in Hybrid' | 'CNG' | 'LPG' | 'Hydrogen' | 'Ethanol' | 'Bio-Diesel' | 'Synthetic Fuels';
  vehicle_status: 'Available' | 'Reserved' | 'In Maintenance' | 'Defect State' | 'Out of Order' | 'Decommissioned';
  created_at: string;
  company_id: number;
}

// Get all vehicles
export const getAllVehicles = async (): Promise<Vehicle[]> => {
  try {
    const response = await apiClient.get<Vehicle[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return handleApiError<Vehicle[]>(error, []); // Return an empty array if the user is logged out
  }
};

// Get a single vehicle by ID
export const getVehicleById = async (id: number): Promise<Vehicle | null> => {
  try {
    const response = await apiClient.get<Vehicle>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError<Vehicle | null>(error, null); // Return null if the user is logged out
  }
};

// Create a new vehicle
export const createVehicle = async (
  vehicleData: Omit<Vehicle, 'vehicle_id' | 'created_at'>
): Promise<Vehicle | null> => {
  try {
    const response = await apiClient.post<Vehicle>(`${BASE_URL}`, vehicleData);
    return response.data;
  } catch (error) {
    return handleApiError<Vehicle | null>(error, null); // Return null if the user is logged out
  }
};

// Update a vehicle
export const updateVehicle = async (
  id: number,
  updatedData: Partial<Omit<Vehicle, 'vehicle_id' | 'created_at'>>
): Promise<Vehicle | null> => {
  try {
    const response = await apiClient.put<Vehicle>(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    return handleApiError<Vehicle | null>(error, null); // Return null if the user is logged out
  }
};

// Delete a vehicle
export const deleteVehicle = async (id: number): Promise<boolean> => {
  try {
    await apiClient.delete(`${BASE_URL}/${id}`);
    return true;
  } catch (error) {
    return handleApiError<boolean>(error, false); // Return false if the user is logged out
  }
};

// Get all vehicles by company ID
export const getVehiclesByCompanyId = async (companyId: number): Promise<Vehicle[]> => {
  try {
    const response = await apiClient.get<Vehicle[]>(`${BASE_URL}/company/${companyId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, []); // Return an empty array if an error occurs
  }
};