import { config } from '../../config';
import apiClient from '../../utils/apiClient';
import { handleApiError } from '../../utils/apiErrorHandler';

// Base URL for reservations endpoint
const BASE_URL = config.RESERVATIONS_ENDPOINT;

export type ReservationStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed' | 'Rejected';

// Reservation model interface
export interface Reservation {
  reservation_id: number;
  vehicle_id: number;
  user_id: number;
  start_time: string; // ISO date string
  end_time: string;   // ISO date string
  pickup_location: string;
  return_location: string;
  reservation_status: ReservationStatus;
  notes: string | null;
  created_at: string; // ISO date string
}

// Get all reservations
export const getAllReservations = async (): Promise<Reservation[]> => {
  try {
    const response = await apiClient.get<Reservation[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return handleApiError<Reservation[]>(error, []); 
  }
};

// Get reservations by vehicle ID
export const getReservationsByVehicleId = async (vehicle_id: number): Promise<Reservation[]> => {
  try {
    const response = await apiClient.get<Reservation[]>(`${BASE_URL}/vehicle/${vehicle_id}`);
    return response.data;
  } catch (error) {
    return handleApiError<Reservation[]>(error, []); 
  }
};

// Get a single reservation by ID
export const getReservationById = async (reservation_id: number): Promise<Reservation | null> => {
  try {
    const response = await apiClient.get<Reservation>(`${BASE_URL}/${reservation_id}`);
    return response.data;
  } catch (error) {
    return handleApiError<Reservation | null>(error, null); 
  }
};

// Create a new reservation
export const createReservation = async (
  reservationData: Omit<Reservation, 'reservation_id' | 'created_at'>
): Promise<Reservation | null> => {
  try {
    const response = await apiClient.post<Reservation>(`${BASE_URL}`, reservationData);
    return response.data;
  } catch (error) {
    return handleApiError<Reservation | null>(error, null);
  }
};

// Update a reservation
export const updateReservation = async (
  reservation_id: number,
  updatedData: Partial<Reservation>
): Promise<Reservation | null> => {
  try {
    const response = await apiClient.put<Reservation>(`${BASE_URL}/${reservation_id}`, updatedData);
    return response.data;
  } catch (error) {
    return handleApiError<Reservation | null>(error, null); 
  }
};

// Delete a reservation
export const deleteReservation = async (reservation_id: number): Promise<boolean> => {
  try {
    await apiClient.delete(`${BASE_URL}/${reservation_id}`);
    return true;
  } catch (error) {
    return handleApiError<boolean>(error, false);
  }
};

// Get vehicles with reservations by user ID
export const getVehiclesWithReservationsByUserId = async (
  userId: number
): Promise<Reservation[]> => {
  try {
    const response = await apiClient.get<Reservation[]>(`${BASE_URL}/vehicles/user/${userId}`);
    return response.data;
  } catch (error) {
    return handleApiError<Reservation[]>(error, []); 
  }
};

// Check if a vehicle has an active reservation
export const checkVehicleActiveReservation = async (
  vehicleId: number
): Promise<{ isReserved: boolean; reservation: Reservation | null }> => {
  try {
    const response = await apiClient.get<{ isReserved: boolean; reservation: Reservation | null }>(
      `${BASE_URL}/vehicle/${vehicleId}/active`
    );
    return response.data;
  } catch (error) {
    return handleApiError<{ isReserved: boolean; reservation: Reservation | null }>(error, {
      isReserved: false,
      reservation: null,
    }); 
  }
};
