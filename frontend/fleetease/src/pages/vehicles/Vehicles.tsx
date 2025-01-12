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

    const fetchData = async () => {
      await Promise.all([fetchVehicleData(), fetchReservations()]); // Ensure both are done before finishing
      setIsLoading(false);
    };

    fetchData();
  }, [vehicleId, isAuthenticated]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4 min-h-screen">
        <div className="spinner text-lg">Loading...</div>
      </div>
    );
  }

  // User not authenticated
  if (!isAuthenticated) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg">Please sign in to view this page.</p>
      </div>
    );
  }

  // Vehicle not found or error fetching data
  if (!vehicle || error) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg text-red-500">{error || 'Vehicle not found.'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-6">
      <div className="mb-6 md:mb-8">
        <header className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Vehicle Details</header>
        <VehicleDetailsCard vehicleId={Number(vehicleId)} />
      </div>

      <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-7 md:gap-6">
        <div className="lg:col-span-3 w-full">
          <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Reservation Calendar</h3>
          {user ? (
            <div className="overflow-x-auto max-w-xl mx-auto lg:max-w-none">
              <ReservationCalendar
                user={user}
                vehicleId={Number(vehicleId)}
              />
            </div>
          ) : (
            <div className="text-sm md:text-base">Please log in to view the reservation calendar.</div>
          )}
        </div>

        <div className="lg:col-span-4 w-full">
          <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4"></h3>
          <CurrentReservations vehicleId={Number(vehicleId)} />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
