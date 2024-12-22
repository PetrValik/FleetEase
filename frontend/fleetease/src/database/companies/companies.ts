import apiClient from '../../utils/apiClient';
import { config } from '../../config';
import { handleApiError } from '../../utils/apiErrorHandler';

const BASE_URL = config.COMPANIES_ENDPOINT;

// Interface for Company
export interface Company {
  company_id: number;
  company_name: string;
  description: string | null; // Nullable field
}

// Get all companies
export const getAllCompanies = async (): Promise<Company[]> => {
  try {
    const response = await apiClient.get<Company[]>(BASE_URL);
    return response.data;
  } catch (error) {
    return handleApiError<Company[]>(error, []); 
  }
};

// Get a single company by ID
export const getCompanyById = async (id: number): Promise<Company> => {
  try {
    const response = await apiClient.get<Company>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError<Company>(error, {
      company_id: -1, 
      company_name: '',
      description: null,
    });
  }
};

// Create a new company
export const createCompany = async (
  companyData: Omit<Company, 'company_id'>
): Promise<Company> => {
  try {
    const response = await apiClient.post<Company>(BASE_URL, companyData);
    return response.data;
  } catch (error) {
    return handleApiError<Company>(error, {
      company_id: -1, 
      company_name: '',
      description: null,
    });
  }
};

// Update a company
export const updateCompany = async (
  id: number,
  updatedData: Partial<Omit<Company, 'company_id'>>
): Promise<Company> => {
  try {
    const response = await apiClient.put<Company>(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    return handleApiError<Company>(error, {
      company_id: -1,
      company_name: '',
      description: null,
    });
  }
};

// Delete a company
export const deleteCompany = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    handleApiError<void>(error, undefined); 
  }
};
