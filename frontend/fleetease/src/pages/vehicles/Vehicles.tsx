import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import VehicleDetailsCard from '../../components/vehicle/VehicleDetailCard';
import ReservationCalendar from '../../components/vehicle/ReservationCalendar';
import CurrentReservations from '../../components/vehicle/CurrentReservations';
import { getReservationsByVehicleId, Reservation } from '../../database/reservations/reservations';
import { getVehicleById, Vehicle } from '../../database/vehicles/vehicles';
import { useParams } from 'react-router-dom';

const VehicleDetailPage: React.FC = () => {
  const { isAuthenticated, user } = useUser();
  const { vehicleId } = useParams<{ vehicleId: string }>();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch vehicle data and reservations data
  useEffect(() => {
    if (!isAuthenticated || !vehicleId) {
      setIsLoading(false);
      return;
    }

    const fetchVehicleData = async () => {
      try {
        const vehicleData = await getVehicleById(Number(vehicleId));
        setVehicle(vehicleData);
      } catch (err) {
        setError('Failed to fetch vehicle details');
      }
    };

    const fetchReservations = async () => {
      try {
        const fetchedReservations = await getReservationsByVehicleId(Number(vehicleId));
        console.log("Fetched Reservations:", fetchedReservations); // Log to check the response
        setReservations(fetchedReservations);
      } catch (err) {
        setError('Failed to fetch reservations');
      }
    };

    fetchVehicleData();
    fetchReservations();

    setIsLoading(false);
  }, [vehicleId, isAuthenticated]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  // User not authenticated
  if (!isAuthenticated) {
    return (
      <div className="p-6">
        <p>Please sign in to view this page.</p>
      </div>
    );
  }

  // Vehicle not found or error fetching data
  if (!vehicle || error) {
    return (
      <div className="p-6">
        <p>{error || 'Vehicle not found.'}</p>
      </div>
    );
  }

  // Function to refresh the reservations list after a new reservation is added
  const refreshReservations = async () => {
    try {
      console.log("Refreshing reservations...");
      // Fetch updated reservations from the API
      const fetchedReservations = await getReservationsByVehicleId(Number(vehicleId));
      console.log("Updated Reservations:", fetchedReservations); // Log to check the updated reservations
      setReservations(fetchedReservations);
    } catch (error) {
      console.error('Error refreshing reservations:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <header className="text-3xl font-bold mb-6">Vehicle Details</header>
        <VehicleDetailsCard vehicleId={Number(vehicleId)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 w-full">
          <h3 className="text-2xl font-semibold mb-4">Reservation Calendar</h3>
          {user ? (
            <ReservationCalendar
              reservations={reservations}
              user={user}
              vehicleId={Number(vehicleId)}
              refreshReservations={refreshReservations} // Pass the refresh function
            />
          ) : (
            <div>Please log in to view the reservation calendar.</div>
          )}
        </div>

        <div className="lg:col-span-2 w-full">
          <h3 className="text-2xl font-semibold mb-4">Current Reservations</h3>
          <CurrentReservations
            vehicleId={Number(vehicleId)}
            refreshReservations={refreshReservations} // Pass the refresh function
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
