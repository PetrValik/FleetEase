import React, { useState, useEffect } from 'react';
import { Reservation, getReservationsByVehicleId, deleteReservation } from '../../database/reservations/reservations';
import ReservationCard from './reservations/ReservationCard';

interface CurrentReservationsProps {
  vehicleId: number;
}

const CurrentReservations: React.FC<CurrentReservationsProps> = ({ vehicleId }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = async () => {
    try {
      setIsLoading(true);
      const fetchedReservations = await getReservationsByVehicleId(vehicleId);
      setReservations(fetchedReservations);
      setError(null);
    } catch (error) {
      setError('Error fetching reservations. Please try again later.');
      console.error('Error fetching reservations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (reservationId: number) => {
    try {
      const success = await deleteReservation(reservationId);
      if (success) {
        setReservations((prevReservations) =>
          prevReservations.filter((reservation) => reservation.reservation_id !== reservationId)
        );
      } else {
        setError('Failed to delete the reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting reservation:', error);
      setError('An unexpected error occurred while deleting the reservation.');
    }
  };

  // Fetch reservations once when the component mounts or when vehicleId changes
  useEffect(() => {
    fetchReservations();
  }, [vehicleId]);

  if (isLoading) {
    return <div>Loading reservations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (reservations.length === 0) {
    return <div>No current reservations found for this vehicle.</div>;
  }

  return (
    <div className="reservations-container" style={{ padding: '20px' }}>
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
