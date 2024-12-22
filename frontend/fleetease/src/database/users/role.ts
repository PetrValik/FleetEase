import apiClient from '../../utils/apiClient';
import { Role } from '../../contexts/UserContext';
import { config } from '../../config';
import { handleApiError } from '../../utils/apiErrorHandler';

const BASE_URL = config.ROLES_ENDPOINT;

// Get all roles
export const getAllRoles = async (): Promise<Role[]> => {
    try {
      const response = await apiClient.get<Role[]>(`${BASE_URL}/`);
      return response.data;
    } catch (error) {
      return handleApiError<Role[]>(error, []);
    }
  };

  export const getRoleById = async (role_id: number): Promise<Role | null> => {
    try {
      const response = await apiClient.get<Role>(`${BASE_URL}/${role_id}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching role by ID:', error);
      return handleApiError<Role | null>(error, null); 
    }
  };