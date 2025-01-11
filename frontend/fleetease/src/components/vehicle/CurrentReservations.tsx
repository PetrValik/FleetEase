import React, { useState, useEffect } from 'react';
import { Reservation, getReservationsByVehicleId, deleteReservation } from '../../database/reservations/reservations';
import ReservationCard from './reservations/ReservationCard';
import * as Toast from "../../utils/toastUtils";

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
      Toast.showErrorToast("Unable to fetch reservations");
      console.error('Error fetching reservations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (reservationId: number) => {
    try {
      const success = await deleteReservation(reservationId);
      if (success) {
        Toast.showSuccessToast("Reservation successfully deleted");
        setReservations((prevReservations) =>
          prevReservations.filter((reservation) => reservation.reservation_id !== reservationId)
        );
      } else {
        setError('Failed to delete the reservation. Please try again.');
      }
    } catch (error) {
      Toast.showErrorToast("Error deleting reservation");
      console.error('Error deleting reservation:', error);
      setError('An unexpected error occurred while deleting the reservation.');
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [vehicleId]);

  if (isLoading) {
    return <div className="p-4 text-center">Loading reservations...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (reservations.length === 0) {
    return <div className="p-4 text-center">No current reservations found for this vehicle.</div>;
  }

  return (
    <div className="reservations-container p-4">
      <div className="reservations-list max-h-[490px] overflow-y-auto">
        <ul className="space-y-4">
          {reservations.map((reservation) => (
            <li key={reservation.reservation_id}>
              <ReservationCard
                reservation={reservation}
                onDelete={handleDelete}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CurrentReservations;

