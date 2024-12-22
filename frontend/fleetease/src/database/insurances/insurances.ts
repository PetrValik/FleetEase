import apiClient from '../../utils/apiClient';
import { config } from '../../config';
import { handleApiError } from '../../utils/apiErrorHandler';

const BASE_URL = config.INSURANCES_ENDPOINT;

export type InsuranceType = 'Driver' | 'Vehicle' | 'Liability';
export type PaymentMethod = 'Monthly' | 'Quarterly' | 'Semi-Annual' | 'Annual' | 'One-Time';
export type InsuranceStatus = 'Active' | 'Pending' | 'Archived' | 'Ending';

export interface Insurance {
  insurance_id?: number;
  insurance_types: InsuranceType;
  registration_number: string | null;
  start_date: string;
  end_date: string;
  name: string | null;
  payment_method: PaymentMethod;
  insurance_company_id: number;
  insurance_status: InsuranceStatus;
  company_id: number;
  description: string | null;
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
export const getInsuranceById = async (id: number): Promise<Insurance | null> => {
  try {
    const response = await apiClient.get<Insurance>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError<Insurance | null>(error, null); 
  }
};

// Create a new insurance
export const createInsurance = async (
  insuranceData: Omit<Insurance, 'insurance_id'>
): Promise<Insurance | null> => {
  try {
    const response = await apiClient.post<Insurance>(
      config.INSURANCES_ENDPOINT, 
      insuranceData
    );
    return response.data;
  } catch (error) {
    return handleApiError<Insurance | null>(error, null);
  }
};

// Update an insurance
export const updateInsurance = async (
  id: number,
  updatedData: Partial<Insurance>
): Promise<Insurance | null> => {
  try {
    const response = await apiClient.put<Insurance>(
      `${config.INSURANCES_ENDPOINT}/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    return handleApiError<Insurance | null>(error, null);
  }
};

// Delete an insurance
export const deleteInsurance = async (id: number): Promise<boolean> => {
  try {
    await apiClient.delete(`${BASE_URL}/${id}`);
    return true;
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

// Get insurances by company ID
export const getInsurancesByCompany = async (companyId: number): Promise<Insurance[]> => {
  try {
    // Call the API endpoint to fetch insurances for the specified company
    const response = await apiClient.get<Insurance[]>(`${BASE_URL}/company/${companyId}`);

    // Return the response data (list of insurances)
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching insurances for companyId: ${companyId}`, error);

    // Handle the error using a centralized error handling function
    return handleApiError<Insurance[]>(error, []); // Return an empty array if an error occurs
  }
};