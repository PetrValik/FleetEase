import axios from 'axios';
import { config } from '../../config';
import { User } from '../../contexts/UserContext';

const BASE_URL = config.USERS_ENDPOINT;

// Interface for simplified responses (Login/Register)
interface BasicUserResponse {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
}

// Interface for detailed user response (Get User, Get All Users)
export interface FullUserResponse extends BasicUserResponse {
  phone_number?: string;
  company_id?: number;
  role: {
    role_id: number;
    role_name: string;
  };
}

// Interface for Login Response
export interface LoginResponse {
  token: string;
  user: BasicUserResponse;
}

// Interface for Register Response
export type RegisterResponse = BasicUserResponse;

// Interface for Get User Response
export type GetUserResponse = FullUserResponse;

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${BASE_URL}/login`, {
      email,
      password,
    });
    // Store the token in localStorage
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Login failed');
  }
};

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(`${BASE_URL}/register`, {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Registration failed');
  }
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.get<{ exists: boolean }>(`${BASE_URL}/email/${email}`);
    return response.data.exists;
  } catch (error) {
    handleAxiosError(error, 'Failed to check email');
  }
};

// Get all users
export const getAllUsers = async (): Promise<GetUserResponse[]> => {
  try {
    const response = await axios.get<GetUserResponse[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Failed to fetch users');
  }
};

// Get user by ID
export const getUserById = async (user_id: number): Promise<GetUserResponse> => {
  try {
    const response = await axios.get<GetUserResponse>(`${BASE_URL}/${user_id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Failed to fetch user');
  }
};

// Update user
export const updateUser = async (user_id: number, updatedData: Partial<GetUserResponse>): Promise<GetUserResponse> => {
  try {
    const response = await axios.put<GetUserResponse>(`${BASE_URL}/${user_id}`, updatedData);
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'Failed to update user');
  }
};

// Delete user
export const deleteUser = async (user_id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${user_id}`);
  } catch (error) {
    handleAxiosError(error, 'Failed to delete user');
  }
};

// Helper function to handle Axios errors
const handleAxiosError = (error: any, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || defaultMessage);
  } else {
    throw new Error('An unexpected error occurred');
  }
};
