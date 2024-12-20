import apiClient from '../../utils/apiClient';
import { config } from '../../config';
import { handleApiError } from '../../utils/apiErrorHandler';

const BASE_URL = config.DEFECT_TYPES_ENDPOINT; // Use the correct endpoint from config

// Interface for DefectType
export interface DefectType {
  type_id: number;
  type_name: string;
  description: string | null; // Nullable field
}

// Get all defect types
export const getAllDefectTypes = async (): Promise<DefectType[]> => {
  try {
    const response = await apiClient.get<DefectType[]>(BASE_URL);
    return response.data;
  } catch (error) {
    return handleApiError(error, []); 
  }
};

// Get a single defect type by ID
export const getDefectTypeById = async (id: number): Promise<DefectType | null> => {
  try {
    const response = await apiClient.get<DefectType>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, null); 
  }
};

// Create a new defect type
export const createDefectType = async (
  defectTypeData: Omit<DefectType, 'type_id'>
): Promise<DefectType | null> => {
  try {
    const response = await apiClient.post<DefectType>(BASE_URL, defectTypeData);
    return response.data;
  } catch (error) {
    return handleApiError(error, null); 
  }
};

// Update a defect type
export const updateDefectType = async (
  id: number,
  updatedData: Partial<Omit<DefectType, 'type_id'>>
): Promise<DefectType | null> => {
  try {
    const response = await apiClient.put<DefectType>(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    return handleApiError(error, null);
  }
};

// Delete a defect type
export const deleteDefectType = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    handleApiError(error, undefined);
  }
};
