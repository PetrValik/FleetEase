// uncomment this and comment other config fot classic frontend to backend architecture, number can be changed but it need to be same asi you backend
const API_BASE_URL = 'http://localhost:8080/api'; 

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
  ROLES_ENDPOINT: `${API_BASE_URL}/roles`,
};

/*
export const config = {
  API_BASE_URL: `/api/`,
  USERS_ENDPOINT: `api/users`,
  LOGS_ENDPOINT: `/api/logs`,
  INSURANCES_ENDPOINT: `/api/insurances`,
  INSURANCE_COMPANIES_ENDPOINT: `/api/insurance-companies`,
  VEHICLES_ENDPOINT: `/api/vehicles`,
  RESERVATIONS_ENDPOINT: `/api/reservations`,
  VEHICLE_CATEGORIES_ENDPOINT: `/api/vehicle-categories`,
  VEHICLE_MODELS_ENDPOINT: `/api/vehicle-models`, 
  VEHICLE_BRANDS_ENDPOINT: `/api/vehicle-brands`,
  COUNTRIES_ENDPOINT: `/api/countries`, 
  COMPANIES_ENDPOINT: `/api/companies`, 
  VEHICLE_INSPECTIONS_ENDPOINT: `/api/vehicle-inspections`,
  DEFECTS_ENDPOINT: `/api/defects`,
  DEFECT_TYPES_ENDPOINT: `/api/defect-types`,
  ROLES_ENDPOINT: `/api/roles`,
};
*/
