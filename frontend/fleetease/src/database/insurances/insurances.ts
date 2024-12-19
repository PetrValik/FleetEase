import axios from 'axios';
import { config } from '../../config';

const BASE_URL = config.INSURANCES_ENDPOINT;

// Define the Insurance model
export interface Insurance {
  insurance_id: number;
  insurance_types: 'Driver' | 'Vehicle' | 'Liability';
  policy_number: string;
  start_date: string; // ISO format date
  end_date: string; // ISO format date
  premium_amount: number | null; // Nullable field
  payment_method: 'Monthly' | 'Quarterly' | 'Semi-Annual' | 'Annual' | 'One-Time';
  insurance_company_id: number;
  insurance_status: 'Pending' | 'Active' | 'Archived' | 'Ending soon';
  company_id: number | null; // Nullable field
  description: string | null; // Nullable field
}

// Get all insurances
export const getAllInsurances = async (): Promise<Insurance[]> => {
  try {
    const response = await axios.get<Insurance[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all insurances:', error);
    throw new Error('Failed to fetch all insurances');
  }
};

// Get a single insurance by ID
export const getInsuranceById = async (id: number): Promise<Insurance> => {
  try {
    const response = await axios.get<Insurance>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching insurance by ID:', error);
    throw new Error('Failed to fetch insurance');
  }
};

// Create a new insurance
export const createInsurance = async (insuranceData: Partial<Insurance>): Promise<Insurance> => {
  try {
    const response = await axios.post<Insurance>(`${BASE_URL}`, insuranceData);
    return response.data;
  } catch (error) {
    console.error('Error creating insurance:', error);
    throw new Error('Failed to create insurance');
  }
};

// Update an insurance
export const updateInsurance = async (
  id: number,
  updatedData: Partial<Insurance>
): Promise<Insurance> => {
  try {
    const response = await axios.put<Insurance>(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating insurance:', error);
    throw new Error('Failed to update insurance');
  }
};

// Delete an insurance
export const deleteInsurance = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting insurance:', error);
    throw new Error('Failed to delete insurance');
  }
};

// Get insurances by type and company ID
export const getInsurancesByTypeAndCompany = async (
  type: string,
  companyId: number
): Promise<Insurance[]> => {
  try {
    const response = await axios.get<Insurance[]>(`${BASE_URL}/filter`, {
      params: { type, company_id: companyId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching insurances by type and company:', error);
    throw new Error('Failed to fetch insurances');
  }
};
