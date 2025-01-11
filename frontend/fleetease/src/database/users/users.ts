import apiClient from "../../utils/apiClient";
import { config } from "../../config";
import { User, Role } from "../../contexts/UserContext";
import { handleApiError } from "../../utils/apiErrorHandler";
import { getStoredToken } from "../../utils/authUtils";

const BASE_URL = config.USERS_ENDPOINT;

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface UpdateUser {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string | null;
  company_id?: number | null;
  roles_id?: number;
}

export interface GetUser {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  created_at: string; // time without time zone
  is_active: boolean;
  company_id: number | null;
  roles_id: number;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>(`${BASE_URL}/login`, {
      email,
      password,
    });
    // Store the token in localStorage
    localStorage.setItem("token", response.data.token);
    // Set the default Authorization header for future requests
    apiClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("An unexpected error occurred during login");
  }
};

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<RegisterResponse> => {
  try {
    const response = await apiClient.post<RegisterResponse>(
      `${BASE_URL}/register`,
      {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("An unexpected error occurred during registration");
  }
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await apiClient.get<{ exists: boolean }>(
      `${BASE_URL}/email/${email}`
    );
    return response.data.exists;
  } catch (error) {
    return handleApiError<boolean>(error, false);
  }
};

// Get all users
export const getAllUsers = async (): Promise<GetUser[]> => {
  try {
    const response = await apiClient.get<GetUser[]>(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    return handleApiError<GetUser[]>(error, []);
  }
};

// Get all users without a company
export const getAllUsersWithoutCompany = async (): Promise<GetUser[]> => {
  try {
    const response = await apiClient.get<GetUser[]>(`${BASE_URL}/without-company`);
    return response.data;
  } catch (error) {
    return handleApiError<GetUser[]>(error, []);
  }
};

// Get all users from a specific company
export const getAllUsersFromCompany = async (
  companyId: number,
  currentUserId: number
): Promise<GetUser[]> => {
  try {
    const response = await apiClient.get<GetUser[]>(
      `${BASE_URL}/company/${companyId}`,
      { params: { excludeUserId: currentUserId } } // Pass the current user ID as a query parameter
    );
    return response.data;
  } catch (error) {
    return handleApiError<GetUser[]>(error, []);
  }
};

// Update a user
export const updateUser = async (
  id: number,
  userData: Partial<UpdateUser>
): Promise<UpdateUser> => {
  try {
    const response = await apiClient.put<UpdateUser>(
      `${BASE_URL}/${id}`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw new Error("An unexpected error occurred while updating the user");
  }
};

export const googleLogin = async (user: any): Promise<LoginResponse> => {
  try {
    // Extrahování požadovaných dat z uživatelského objektu
    const firstName = user.displayName.split(' ')[0]; // První část jména
    const lastName = user.displayName.split(' ')[1];  // Druhá část jména
    const email = user.email;
    const localId = user.uid; // Jedinečný identifikátor uživatele
    const providerId = user.providerId; // ID poskytovatele (Google)

    // Poslání dat na backend
    const response = await apiClient.post<LoginResponse>(`${BASE_URL}/googleSign`, {
      firstName,
      lastName,
      email,
      localId,
      providerId,
    });

    // Store the token in localStorage
    localStorage.setItem("token", response.data.token);
    // Set the default Authorization header for future requests
    apiClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
    return response.data;

  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("An unexpected error occurred during login");
  }
};

export const getUserById = async (id: number): Promise<GetUser | null> => {
  try {
    const response = await apiClient.get<GetUser>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError<GetUser | null>(error, null);
  }
};

export const restoreUser = async (): Promise<User | null> => {
  try {
    const token = getStoredToken();
    if (!token) {
      return null;
    }

    apiClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;

    const response = await apiClient.get(`${BASE_URL}/verify`);
    return response.data.user;
  } catch (error) {
    console.error("Error in restoreUser:" , error);
    return null;
  }
};
