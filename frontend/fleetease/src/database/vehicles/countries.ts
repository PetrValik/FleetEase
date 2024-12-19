import { config } from '../../config';
import apiClient from '../../utils/apiClient';
import { handleApiError } from '../../utils/apiErrorHandler';

const BASE_URL = config.COUNTRIES_ENDPOINT;

// Define the Country model
export interface Country {
  country_id: number;
  country_name: string;
  country_code2: string;
  country_code3: string;
  numeric: number;
}

// Get all countries
export const getAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await apiClient.get<Country[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, []); 
  }
};

// Get a single country by ID
export const getCountryById = async (countryId: number): Promise<Country | null> => {
  try {
    const response = await apiClient.get<Country>(`${BASE_URL}/${countryId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, null); 
  }
};

// Create a new country
export const createCountry = async (
  countryData: Omit<Country, 'country_id'>
): Promise<Country | null> => {
  try {
    const response = await apiClient.post<Country>(`${BASE_URL}`, countryData);
    return response.data;
  } catch (error) {
    return handleApiError(error, null); 
  }
};

// Update an existing country
export const updateCountry = async (
  countryId: number,
  updatedData: Partial<Omit<Country, 'country_id'>>
): Promise<Country | null> => {
  try {
    const response = await apiClient.put<Country>(`${BASE_URL}/${countryId}`, updatedData);
    return response.data;
  } catch (error) {
    return handleApiError(error, null); 
  }
};

// Delete a country
export const deleteCountry = async (countryId: number): Promise<void> => {
  try {
    await apiClient.delete(`${BASE_URL}/${countryId}`);
  } catch (error) {
    handleApiError(error, null); 
  }
};
