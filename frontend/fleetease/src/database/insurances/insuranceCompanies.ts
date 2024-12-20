import apiClient from '../../utils/apiClient';
import { config } from '../../config';
import { handleApiError } from '../../utils/apiErrorHandler';

const BASE_URL = config.INSURANCE_COMPANIES_ENDPOINT;

// Define interfaces for the responses
export interface InsuranceCompany {
  insurance_company_id: number;
  company_name: string;
}

// Get all insurance companies
export const getAllInsuranceCompanies = async (): Promise<InsuranceCompany[]> => {
  try {
    const response = await apiClient.get<InsuranceCompany[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return handleApiError<InsuranceCompany[]>(error, []); 
  }
};

// Get a single insurance company by ID
export const getInsuranceCompanyById = async (id: number): Promise<InsuranceCompany | null> => {
  try {
    const response = await apiClient.get<InsuranceCompany>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError<InsuranceCompany | null>(error, null); 
  }
};

// Create a new insurance company
export const createInsuranceCompany = async (
  companyData: Omit<InsuranceCompany, 'insurance_company_id'>
): Promise<InsuranceCompany | null> => {
  try {
    const response = await apiClient.post<InsuranceCompany>(`${BASE_URL}`, companyData);
    return response.data;
  } catch (error) {
    return handleApiError<InsuranceCompany | null>(error, null); 
  }
};

// Update an insurance company
export const updateInsuranceCompany = async (
  id: number,
  updatedData: Partial<Omit<InsuranceCompany, 'insurance_company_id'>>
): Promise<InsuranceCompany | null> => {
  try {
    const response = await apiClient.put<InsuranceCompany>(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    return handleApiError<InsuranceCompany | null>(error, null); 
  }
};

// Delete an insurance company
export const deleteInsuranceCompany = async (id: number): Promise<boolean> => {
  try {
    await apiClient.delete(`${BASE_URL}/${id}`);
    return true;
  } catch (error) {
    return handleApiError<boolean>(error, false); 
  }
};
