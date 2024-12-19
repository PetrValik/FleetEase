// Default to localhost if REACT_APP_API_BASE_URL is not set
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

export const config = {
  API_BASE_URL,
  USERS_ENDPOINT: `${API_BASE_URL}/users`,
  LOGS_ENDPOINT: `${API_BASE_URL}/logs`,
  INSURANCES_ENDPOINT: `${API_BASE_URL}/insurances`,
  INSURANCE_COMPANIES_ENDPOINT: `${API_BASE_URL}/insurance-companies`,
  VEHICLES_ENDPOINT: `${API_BASE_URL}/vehicles`,
  RESERVATIONS_ENDPOINT: `${API_BASE_URL}/reservations`,
  VEHICLE_CATEGORIES_ENDPOINT: `${API_BASE_URL}/vehicle-categories`,
  VEHICLE_MODELS_ENDPOINT: `${API_BASE_URL}/vehicle-models`, 
  VEHICLE_BRANDS_ENDPOINT: `${API_BASE_URL}/vehicle-brands`,
  COUNTRIES_ENDPOINT: `${API_BASE_URL}/countries`, 
  COMPANIES_ENDPOINT: `${API_BASE_URL}/companies`, 
  VEHICLE_INSPECTIONS_ENDPOINT: `${API_BASE_URL}/vehicle-inspections`,
  DEFECTS_ENDPOINT: `${API_BASE_URL}/defects`,
  DEFECT_TYPES_ENDPOINT: `${API_BASE_URL}/defect-types`,
};
