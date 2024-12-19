import axios from 'axios';
import { config } from '../../config';

const BASE_URL = config.INSURANCE_COMPANIES_ENDPOINT;

// Define interfaces for the responses
export interface InsuranceCompany {
  insurance_company_id: number;
  company_name: string;
}

// Get all insurance companies
export const getAllInsuranceCompanies = async (): Promise<InsuranceCompany[]> => {
  try {
    const response = await axios.get<InsuranceCompany[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all insurance companies:', error);
    throw new Error('Failed to fetch all insurance companies');
  }
};

// Get a single insurance company by ID
export const getInsuranceCompanyById = async (id: number): Promise<InsuranceCompany> => {
  try {
    const response = await axios.get<InsuranceCompany>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching insurance company by ID:', error);
    throw new Error('Failed to fetch insurance company');
  }
};

// Create a new insurance company
export const createInsuranceCompany = async (
  companyData: Omit<InsuranceCompany, 'insurance_company_id'>
): Promise<InsuranceCompany> => {
  try {
    const response = await axios.post<InsuranceCompany>(`${BASE_URL}`, companyData);
    return response.data;
  } catch (error) {
    console.error('Error creating insurance company:', error);
    throw new Error('Failed to create insurance company');
  }
};

// Update an insurance company
export const updateInsuranceCompany = async (
  id: number,
  updatedData: Partial<Omit<InsuranceCompany, 'insurance_company_id'>>
): Promise<InsuranceCompany> => {
  try {
    const response = await axios.put<InsuranceCompany>(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating insurance company:', error);
    throw new Error('Failed to update insurance company');
  }
};

// Delete an insurance company
export const deleteInsuranceCompany = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting insurance company:', error);
    throw new Error('Failed to delete insurance company');
  }
};
