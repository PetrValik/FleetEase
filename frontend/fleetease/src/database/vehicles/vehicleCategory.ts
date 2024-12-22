import { config } from '../../config';
import apiClient from '../../utils/apiClient';
import { handleApiError } from '../../utils/apiErrorHandler';

const BASE_URL = config.VEHICLE_CATEGORIES_ENDPOINT;

// Define the VehicleCategory model
export interface VehicleCategory {
  category_id: number;
  category_name: string;
  inspection_period: number;
  emissions_period: number;
}

// Get all vehicle categories
export const getAllVehicleCategories = async (): Promise<VehicleCategory[]> => {
  try {
    const response = await apiClient.get<VehicleCategory[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, []); 
  }
};

// Get a single vehicle category by ID
export const getVehicleCategoryById = async (categoryId: number): Promise<VehicleCategory | null> => {
  try {
    const response = await apiClient.get<VehicleCategory>(`${BASE_URL}/${categoryId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, null); 
  }
};

// Create a new vehicle category
export const createVehicleCategory = async (
  categoryData: Omit<VehicleCategory, 'category_id'>
): Promise<VehicleCategory | null> => {
  try {
    const response = await apiClient.post<VehicleCategory>(`${BASE_URL}`, categoryData);
    return response.data;
  } catch (error) {
    return handleApiError(error, null);
  }
};

// Update an existing vehicle category
export const updateVehicleCategory = async (
  categoryId: number,
  updatedData: Partial<Omit<VehicleCategory, 'category_id'>>
): Promise<VehicleCategory | null> => {
  try {
    const response = await apiClient.put<VehicleCategory>(`${BASE_URL}/${categoryId}`, updatedData);
    return response.data;
  } catch (error) {
    return handleApiError(error, null);
  }
};

// Delete a vehicle category
export const deleteVehicleCategory = async (categoryId: number): Promise<void> => {
  try {
    await apiClient.delete(`${BASE_URL}/${categoryId}`);
  } catch (error) {
    handleApiError(error, null); 
  }
};
