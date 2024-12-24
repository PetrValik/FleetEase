import React, { useState, useEffect } from 'react';
import { Reservation, getReservationsByVehicleId, deleteReservation, createReservation } from '../../database/reservations/reservations';
import ReservationCard from './reservations/ReservationCard';

interface CurrentReservationsProps {
  vehicleId: number;
  refreshReservations: () => Promise<void>; // Ensure it returns a promise to handle async
}

const CurrentReservations: React.FC<CurrentReservationsProps> = ({ vehicleId, refreshReservations }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reservations for a given vehicle ID
  const fetchReservations = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching reservations for vehicleId:", vehicleId);
      const fetchedReservations = await getReservationsByVehicleId(vehicleId);
      console.log("Fetched reservations:", fetchedReservations);  // Check the fetched data
      setReservations(fetchedReservations); // Ensure state is updated
      setError(null);
    } catch (error) {
      setError('Error fetching reservations. Please try again later.');
      console.error('Error fetching reservations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reservation submission (creation)
  const handleAddReservation = async (reservationData: Omit<Reservation, 'reservation_id'>) => {
    try {
      console.log("Adding reservation data:", reservationData);
      // Create reservation on the server
      const createdReservation = await createReservation(reservationData);

      if (createdReservation) {
        console.log("Reservation created successfully:", createdReservation);

        // Manually trigger fetchReservations after creation to ensure we update the state with new data
        console.log("Manually triggering fetchReservations after adding a reservation...");
        await fetchReservations(); // Manually fetch data to guarantee the UI gets updated
      } else {
        setError('Failed to create the reservation.');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      setError('An unexpected error occurred while creating the reservation.');
    }
  };

  // Handle reservation deletion
  const handleDelete = async (reservationId: number) => {
    try {
      console.log("Deleting reservation with ID:", reservationId);
      const success = await deleteReservation(reservationId);
      if (success) {
        // Filter the deleted reservation out of the state
        setReservations((prev) =>
          prev.filter((reservation) => reservation.reservation_id !== reservationId)
        );
        console.log("Deleted reservation, updated state:", reservations);  // Log to verify state update
      } else {
        setError('Failed to delete the reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
      setError('An unexpected error occurred while deleting the reservation.');
    }
  };

  // Initial fetch of reservations when the component mounts
  useEffect(() => {
    console.log("Component mounted or vehicleId changed:", vehicleId);
    fetchReservations();
  }, [vehicleId]); // Only re-fetch when the vehicleId changes

  // Loading state
  if (isLoading) {
    return <div>Loading reservations...</div>;
  }

  // Error handling
  if (error) {
    return <div>{error}</div>;
  }

  // No reservations found
  if (reservations.length === 0) {
    return <div>No current reservations found for this vehicle.</div>;
  }

  return (
    <div className="reservations-container" style={{ padding: '20px' }}>
      {/* Scrollable container for the entire reservations section */}
      <div className="reservations-list" style={{ maxHeight: '490px', overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {reservations.map((reservation) => (
            <ReservationCard
              key={reservation.reservation_id}
              reservation={reservation}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CurrentReservations;
