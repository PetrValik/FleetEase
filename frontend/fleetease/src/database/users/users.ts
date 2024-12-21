import apiClient from '../../utils/apiClient';
import { config } from '../../config';
import { User } from '../../contexts/UserContext';
import { handleApiError } from '../../utils/apiErrorHandler';

const BASE_URL = config.USERS_ENDPOINT;

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterResponse {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>(`${BASE_URL}/login`, {
      email,
      password,
    });
    // Store the token in localStorage
    localStorage.setItem('token', response.data.token);
    // Set the default Authorization header for future requests
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('An unexpected error occurred during login');
  }
};

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<RegisterResponse> => {
  try {
    const response = await apiClient.post<RegisterResponse>(`${BASE_URL}/register`, {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw new Error('An unexpected error occurred during registration');
  }
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await apiClient.get<{ exists: boolean }>(`${BASE_URL}/email/${email}`);
    return response.data.exists;
  } catch (error) {
    return handleApiError<boolean>(error, false);
  }
};

export const getRoleById = async (role_id: number): Promise<boolean> => {
  try {
    const response = await apiClient.get<{ exists: boolean }>(`${BASE_URL}/roles/${role_id}`);
    return response.data.exists;
  } catch (error) {
    return handleApiError<boolean>(error, false);
  }
};
