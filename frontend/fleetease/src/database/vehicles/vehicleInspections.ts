import apiClient from '../../utils/apiClient';
import { config } from '../../config';
import { handleApiError } from '../../utils/apiErrorHandler';

const BASE_URL = config.VEHICLE_INSPECTIONS_ENDPOINT;

// Interface for VehicleInspection
export interface VehicleInspection {
  inspection_id: number;
  vehicle_id: number;
  inspection_type: string;
  valid_until: string; // ISO date string
}

// Get all vehicle inspections
export const getAllVehicleInspections = async (): Promise<VehicleInspection[]> => {
  try {
    const response = await apiClient.get<VehicleInspection[]>(BASE_URL);
    return response.data;
  } catch (error) {
    return handleApiError(error, []); 
  }
};

// Get inspections by vehicle ID
export const getVehicleInspectionsByVehicleId = async (vehicleId: number): Promise<VehicleInspection[]> => {
  try {
    const response = await apiClient.get<VehicleInspection[]>(`${BASE_URL}/vehicle/${vehicleId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, []); 
  }
};

// Get a single vehicle inspection by ID
export const getVehicleInspectionById = async (inspectionId: number): Promise<VehicleInspection | null> => {
  try {
    const response = await apiClient.get<VehicleInspection>(`${BASE_URL}/${inspectionId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, null);
  }
};

// Create a new vehicle inspection
export const createVehicleInspection = async (
  inspectionData: Omit<VehicleInspection, 'inspection_id'>
): Promise<VehicleInspection | null> => {
  try {
    const response = await apiClient.post<VehicleInspection>(BASE_URL, inspectionData);
    return response.data;
  } catch (error) {
    return handleApiError(error, null); 
  }
};

// Update a vehicle inspection
export const updateVehicleInspection = async (
  inspectionId: number,
  updatedData: Partial<Omit<VehicleInspection, 'inspection_id'>>
): Promise<VehicleInspection | null> => {
  try {
    const response = await apiClient.put<VehicleInspection>(`${BASE_URL}/${inspectionId}`, updatedData);
    return response.data;
  } catch (error) {
    return handleApiError(error, null); 
  }
};

// Delete a vehicle inspection
export const deleteVehicleInspection = async (inspectionId: number): Promise<void> => {
  try {
    await apiClient.delete(`${BASE_URL}/${inspectionId}`);
  } catch (error) {
    handleApiError(error, undefined); 
  }
};
