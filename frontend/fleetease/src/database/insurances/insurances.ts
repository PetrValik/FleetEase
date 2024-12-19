import apiClient from '../../utils/apiClient';
import { config } from '../../config';
import { handleApiError } from '../../utils/apiErrorHandler';

const BASE_URL = config.INSURANCES_ENDPOINT;

// Define the Insurance model
export interface Insurance {
  insurance_id: number;
  insurance_types: 'Driver' | 'Vehicle' | 'Liability'; // Enum values for insurance type
  registration_number: string | null; // Nullable field
  start_date: string; // ISO format date
  end_date: string; // ISO format date
  name: string | null; // Nullable field
  payment_method: 'Monthly' | 'Quarterly' | 'Yearly' | 'One-Time'; // Enum values for payment method
  insurance_company_id: number; // FK to insurance companies
  insurance_status: 'Active' | 'Pending' | 'Expired' | 'Cancelled'; // Enum values for status
  company_id: number; // FK to company
  description: string | null; // Nullable field
}

// Get all insurances
export const getAllInsurances = async (): Promise<Insurance[]> => {
  try {
    const response = await apiClient.get<Insurance[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return handleApiError<Insurance[]>(error, []); // Return an empty array if the user is logged out
  }
};

// Get a single insurance by ID
export const getInsuranceById = async (id: number): Promise<Insurance | null> => {
  try {
    const response = await apiClient.get<Insurance>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError<Insurance | null>(error, null); // Return null if the user is logged out
  }
};

// Create a new insurance
export const createInsurance = async (
  insuranceData: Partial<Insurance>
): Promise<Insurance | null> => {
  try {
    const response = await apiClient.post<Insurance>(`${BASE_URL}`, insuranceData);
    return response.data;
  } catch (error) {
    return handleApiError<Insurance | null>(error, null); // Return null if the user is logged out
  }
};

// Update an insurance
export const updateInsurance = async (
  id: number,
  updatedData: Partial<Insurance>
): Promise<Insurance | null> => {
  try {
    const response = await apiClient.put<Insurance>(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    return handleApiError<Insurance | null>(error, null); // Return null if the user is logged out
  }
};

// Delete an insurance
export const deleteInsurance = async (id: number): Promise<boolean> => {
  try {
    await apiClient.delete(`${BASE_URL}/${id}`);
    return true;
  } catch (error) {
    return handleApiError<boolean>(error, false); // Return false if the user is logged out
  }
};

// Get insurances by type and company ID
export const getInsurancesByTypeAndCompany = async (
  type: string,
  companyId: number
): Promise<Insurance[]> => {
  try {
    const response = await apiClient.get<Insurance[]>(`${BASE_URL}/filter`, {
      params: { type, company_id: companyId },
    });
    return response.data;
  } catch (error) {
    return handleApiError<Insurance[]>(error, []); // Return an empty array if the user is logged out
  }
};
