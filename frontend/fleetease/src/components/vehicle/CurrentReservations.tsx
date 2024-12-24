import React, { useEffect, useState } from 'react';
import { Reservation, getReservationsByVehicleId } from '../../database/reservations/reservations'; // API functions

interface CurrentReservationsProps {
  vehicleId: number; // Vehicle ID passed as a prop
}

const CurrentReservations: React.FC<CurrentReservationsProps> = ({ vehicleId }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]); // Store reservations data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state for error handling

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching
        const fetchedReservations = await getReservationsByVehicleId(vehicleId); // Fetch reservations for the given vehicleId
        setReservations(fetchedReservations); // Set reservations data
        setError(null); // Clear any previous errors
      } catch (error) {
        setError('Error fetching reservations. Please try again later.');
        console.error('Error fetching reservations:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchReservations(); // Trigger reservation fetch
  }, [vehicleId]); // Run when vehicleId changes

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <div>Loading reservations...</div>
      </div>
    ); // Show loading state inside the card
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <div className="text-red-500">{error}</div>
      </div>
    ); // Show error message inside the card
  }

  if (reservations.length === 0) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <div>No current reservations found for this vehicle.</div> 
      </div>
    ); // If no reservations are found, show the message inside the card
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Current Reservations for Vehicle ID: {vehicleId}</h3>
      <ul className="space-y-4">
        {reservations.map((reservation) => (
          <li key={reservation.reservation_id} className="border-b pb-4">
            <div><strong>Pickup Location:</strong> {reservation.pickup_location}</div>
            <div><strong>Return Location:</strong> {reservation.return_location}</div>
            <div><strong>Start Time:</strong> {new Date(reservation.start_time).toLocaleString()}</div>
            <div><strong>End Time:</strong> {new Date(reservation.end_time).toLocaleString()}</div>
            <div><strong>Status:</strong> {reservation.reservation_status}</div>
            <div><strong>Notes:</strong> {reservation.notes || 'No notes available'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrentReservations;
