import axios from 'axios';
import { config } from '../../config';

// Base URL for reservations endpoint
const BASE_URL = config.RESERVATIONS_ENDPOINT;

// Reservation model interface
export interface Reservation {
  reservation_id: number;
  vehicle_id: number;
  user_id: number;
  start_time: string; // ISO date string
  end_time: string;   // ISO date string
  pickup_location: string;
  return_location: string;
  reservation_status: string;
  notes: string | null;
  created_at: string; // ISO date string
}

// Get all reservations
export const getAllReservations = async (): Promise<Reservation[]> => {
  try {
    const response = await axios.get<Reservation[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all reservations:', error);
    throw new Error('Failed to fetch all reservations');
  }
};

// Get reservations by vehicle ID
export const getReservationsByVehicleId = async (vehicle_id: number): Promise<Reservation[]> => {
  try {
    const response = await axios.get<Reservation[]>(`${BASE_URL}/vehicle/${vehicle_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations by vehicle ID:', error);
    throw new Error('Failed to fetch reservations for the vehicle');
  }
};

// Get a single reservation by ID
export const getReservationById = async (reservation_id: number): Promise<Reservation> => {
  try {
    const response = await axios.get<Reservation>(`${BASE_URL}/${reservation_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservation by ID:', error);
    throw new Error('Failed to fetch reservation');
  }
};

// Create a new reservation
export const createReservation = async (reservationData: Omit<Reservation, 'reservation_id' | 'created_at'>): Promise<Reservation> => {
  try {
    const response = await axios.post<Reservation>(`${BASE_URL}`, reservationData);
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw new Error('Failed to create reservation');
  }
};

// Update a reservation
export const updateReservation = async (reservation_id: number, updatedData: Partial<Reservation>): Promise<Reservation> => {
  try {
    const response = await axios.put<Reservation>(`${BASE_URL}/${reservation_id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating reservation:', error);
    throw new Error('Failed to update reservation');
  }
};

// Delete a reservation
export const deleteReservation = async (reservation_id: number): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${reservation_id}`);
  } catch (error) {
    console.error('Error deleting reservation:', error);
    throw new Error('Failed to delete reservation');
  }
};
