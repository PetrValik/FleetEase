import { config } from '../../config';
import apiClient from '../../utils/apiClient';
import { handleApiError } from '../../utils/apiErrorHandler';

const BASE_URL = config.VEHICLE_MODELS_ENDPOINT;

// Interface for the VehicleModel
export interface VehicleModel {
  model_id: number;
  brand_id: number;
  model_name: string;
}

// Fetch all vehicle models
export const getAllVehicleModels = async (): Promise<VehicleModel[]> => {
  try {
    const response = await apiClient.get<VehicleModel[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, []); 
  }
};

// Fetch a specific vehicle model by ID
export const getVehicleModelById = async (modelId: number): Promise<VehicleModel | null> => {
  try {
    const response = await apiClient.get<VehicleModel>(`${BASE_URL}/${modelId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, null); 
  }
};

// Create a new vehicle model
export const createVehicleModel = async (
  modelData: Omit<VehicleModel, 'model_id'>
): Promise<VehicleModel | null> => {
  try {
    const response = await apiClient.post<VehicleModel>(`${BASE_URL}`, modelData);
    return response.data;
  } catch (error) {
    return handleApiError(error, null); 
  }
};

// Update an existing vehicle model
export const updateVehicleModel = async (
  modelId: number,
  updatedData: Partial<Omit<VehicleModel, 'model_id'>>
): Promise<VehicleModel | null> => {
  try {
    const response = await apiClient.put<VehicleModel>(`${BASE_URL}/${modelId}`, updatedData);
    return response.data;
  } catch (error) {
    return handleApiError(error, null); 
  }
};

// Delete a vehicle model
export const deleteVehicleModel = async (modelId: number): Promise<void> => {
  try {
    await apiClient.delete(`${BASE_URL}/${modelId}`);
  } catch (error) {
    handleApiError(error, null); 
  }
};

// Get models by brand ID
export const getModelsByBrandId = async (brandId: number): Promise<VehicleModel[]> => {
  try {
    const response = await apiClient.get<VehicleModel[]>(`${BASE_URL}/brand/${brandId}`);
    return response.data;
  } catch (error) {
    return handleApiError<VehicleModel[]>(error, []); // Return an empty array if an error occurs
  }
};
