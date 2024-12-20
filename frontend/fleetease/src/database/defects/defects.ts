import apiClient from '../../utils/apiClient';
import { config } from '../../config';
import { handleApiError } from '../../utils/apiErrorHandler';

const BASE_URL = config.DEFECTS_ENDPOINT;

// Interface for Defect
export interface Defect {
  defect_id: number;
  created_at: string; // ISO date string
  vehicle_id: number;
  defect_severity: 'Minor' | 'Low' | 'Medium' | 'High' | 'Critical'; // Enum: Defect Severity Level
  type_id: number;
  description: string;
  date_reported: string; // ISO date string
  defect_status: 'Reported' | 'In Progress' | 'Repaired' | 'Closed' | 'Deferred'; // Enum: Defect Status
  repair_cost: number | null; // Nullable field
  user_id: number;
}

// Get all defects
export const getAllDefects = async (): Promise<Defect[]> => {
  try {
    const response = await apiClient.get<Defect[]>(BASE_URL);
    return response.data;
  } catch (error) {
    return handleApiError<Defect[]>(error, []); 
  }
};

// Get defects by vehicle ID
export const getDefectsByVehicleId = async (vehicleId: number): Promise<Defect[]> => {
  try {
    const response = await apiClient.get<Defect[]>(`${BASE_URL}/vehicle/${vehicleId}`);
    return response.data;
  } catch (error) {
    return handleApiError<Defect[]>(error, []); 
  }
};

// Get a single defect by ID
export const getDefectById = async (defectId: number): Promise<Defect | null> => {
  try {
    const response = await apiClient.get<Defect>(`${BASE_URL}/${defectId}`);
    return response.data;
  } catch (error) {
    return handleApiError<Defect | null>(error, null);
  }
};

// Create a new defect
export const createDefect = async (
  defectData: Omit<Defect, 'defect_id' | 'created_at'>
): Promise<Defect | null> => {
  try {
    const response = await apiClient.post<Defect>(BASE_URL, defectData);
    return response.data;
  } catch (error) {
    return handleApiError<Defect | null>(error, null); 
  }
};

// Update a defect
export const updateDefect = async (
  defectId: number,
  updatedData: Partial<Omit<Defect, 'defect_id' | 'created_at'>>
): Promise<Defect | null> => {
  try {
    const response = await apiClient.put<Defect>(`${BASE_URL}/${defectId}`, updatedData);
    return response.data;
  } catch (error) {
    return handleApiError<Defect | null>(error, null);
  }
};

// Delete a defect
export const deleteDefect = async (defectId: number): Promise<void> => {
  try {
    await apiClient.delete(`${BASE_URL}/${defectId}`);
  } catch (error) {
    handleApiError<void>(error, undefined); 
  }
};
