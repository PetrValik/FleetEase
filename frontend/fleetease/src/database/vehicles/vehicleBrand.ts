import { config } from '../../config';
import apiClient from '../../utils/apiClient';
import { handleApiError } from '../../utils/apiErrorHandler';

const BASE_URL = config.VEHICLE_BRANDS_ENDPOINT;

// Interface for the VehicleBrand
export interface VehicleBrand {
  brand_id: number;
  brand_name: string;
}

// Fetch all vehicle brands
export const getAllVehicleBrands = async (): Promise<VehicleBrand[]> => {
  try {
    const response = await apiClient.get<VehicleBrand[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, []); 
  }
};

// Fetch a specific vehicle brand by ID
export const getVehicleBrandById = async (brandId: number): Promise<VehicleBrand | null> => {
  try {
    const response = await apiClient.get<VehicleBrand>(`${BASE_URL}/${brandId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, null); 
  }
};

// Create a new vehicle brand
export const createVehicleBrand = async (
  brandData: Omit<VehicleBrand, 'brand_id'>
): Promise<VehicleBrand | null> => {
  try {
    const response = await apiClient.post<VehicleBrand>(`${BASE_URL}`, brandData);
    return response.data;
  } catch (error) {
    return handleApiError(error, null); 
  }
};

// Update an existing vehicle brand
export const updateVehicleBrand = async (
  brandId: number,
  updatedData: Partial<Omit<VehicleBrand, 'brand_id'>>
): Promise<VehicleBrand | null> => {
  try {
    const response = await apiClient.put<VehicleBrand>(`${BASE_URL}/${brandId}`, updatedData);
    return response.data;
  } catch (error) {
    return handleApiError(error, null);
  }
};

// Delete a vehicle brand
export const deleteVehicleBrand = async (brandId: number): Promise<void> => {
  try {
    await apiClient.delete(`${BASE_URL}/${brandId}`);
  } catch (error) {
    handleApiError(error, null); 
  }
};
