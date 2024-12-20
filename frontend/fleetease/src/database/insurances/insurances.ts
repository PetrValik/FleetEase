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
  payment_method: 'Monthly' | 'Quarterly' | 'Semi-Annual' | 'Annual' | 'One-Time'; // Enum values for payment method
  insurance_company_id: number; // FK to insurance companies
  insurance_status: 'Pending' | 'Active' | 'Archived' | 'Ending'; // Enum values for status
  company_id: number; // FK to company
  description: string | null; // Nullable field
}

// Get all insurances
export const getAllInsurances = async (): Promise<Insurance[]> => {
  try {
    const response = await apiClient.get<Insurance[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return handleApiError<Insurance[]>(error, []); 
  }
};

// Get a single insurance by ID
<<<<<<< Updated upstream
export const getInsuranceById = async (id: number): Promise<Insurance | null> => {
  try {
    const response = await apiClient.get<Insurance>(`${BASE_URL}/${id}`);
=======
export const getInsuranceById = async (insuranceId: number): Promise<Insurance> => {
  try {
    const response = await axios.get<Insurance>(`${BASE_URL}/${insuranceId}`);
>>>>>>> Stashed changes
    return response.data;
  } catch (error) {
    return handleApiError<Insurance | null>(error, null); 
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
    return handleApiError<Insurance | null>(error, null); 
  }
};

// Update an insurance
export const updateInsurance = async (
  insuranceId: number,
  updatedData: Partial<Insurance>
): Promise<Insurance | null> => {
  try {
<<<<<<< Updated upstream
    const response = await apiClient.put<Insurance>(`${BASE_URL}/${id}`, updatedData);
=======
    const response = await axios.put<Insurance>(`${BASE_URL}/${insuranceId}`, updatedData);
>>>>>>> Stashed changes
    return response.data;
  } catch (error) {
    return handleApiError<Insurance | null>(error, null); 
  }
};

// Delete an insurance
<<<<<<< Updated upstream
export const deleteInsurance = async (id: number): Promise<boolean> => {
  try {
    await apiClient.delete(`${BASE_URL}/${id}`);
    return true;
=======
export const deleteInsurance = async (insuranceId: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${insuranceId}`);
>>>>>>> Stashed changes
  } catch (error) {
    return handleApiError<boolean>(error, false); 
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
    return handleApiError<Insurance[]>(error, []); 
  }
};
