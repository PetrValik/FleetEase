import axios from 'axios';
import { config } from '../../config';

const BASE_URL = config.INSURANCES_ENDPOINT;

// Get all insurances
export const getAllInsurances = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all insurances:', error);
    throw new Error('Failed to fetch all insurances');
  }
};

// Get a single insurance by ID
export const getInsuranceById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching insurance by ID:', error);
    throw new Error('Failed to fetch insurance');
  }
};

// Create a new insurance
export const createInsurance = async (insuranceData: object) => {
  try {
    const response = await axios.post(`${BASE_URL}`, insuranceData);
    return response.data;
  } catch (error) {
    console.error('Error creating insurance:', error);
    throw new Error('Failed to create insurance');
  }
};

// Update an insurance
export const updateInsurance = async (id: number, updatedData: object) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating insurance:', error);
    throw new Error('Failed to update insurance');
  }
};

// Delete an insurance
export const deleteInsurance = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting insurance:', error);
    throw new Error('Failed to delete insurance');
  }
};

// Get insurances by type and company ID
export const getInsurancesByTypeAndCompany = async (type: string, companyId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/filter`, {
      params: { type, company_id: companyId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching insurances by type and company:', error);
    throw new Error('Failed to fetch insurances');
  }
};
