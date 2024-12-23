import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext'; // User context for authentication
import VehicleDetailsCard from '../../components/vehicle/VehicleDetailCard'; // Vehicle details component
import ReservationCalendar from '../../components/vehicle/ReservationCalendar'; // Reservation calendar component
import CurrentReservations from '../../components/vehicle/CurrentReservations'; // Current reservations component
import { getReservationsByVehicleId, Reservation } from '../../database/reservations/reservations'; // Fetch reservations by vehicle ID
import { getVehicleById, Vehicle } from '../../database/vehicles/vehicles'; // Fetch vehicle details by ID
import { useParams } from 'react-router-dom'; // React Router for capturing vehicleId from URL params

const VehicleDetailPage: React.FC = () => {
  const { isAuthenticated, user } = useUser(); // Get authentication status and user from context
  const { vehicleId } = useParams<{ vehicleId: string }>(); // Capture vehicleId from URL params

  const [reservations, setReservations] = useState<Reservation[]>([]); // Store reservations data
  const [vehicle, setVehicle] = useState<Vehicle | null>(null); // Store vehicle details
  const [isLoading, setIsLoading] = useState(true); // Loading state for data fetching

  // Fetch vehicle data and reservations data
  useEffect(() => {
    const fetchVehicleData = async () => {
      const vehicleData = await getVehicleById(Number(vehicleId));
      setVehicle(vehicleData);
    };

    const fetchReservations = async () => {
      const fetchedReservations = await getReservationsByVehicleId(Number(vehicleId));
      setReservations(fetchedReservations);
    };

    if (isAuthenticated && vehicleId) {
      fetchVehicleData();
      fetchReservations();
    }

    setIsLoading(false);
  }, [vehicleId, isAuthenticated]);

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // User not authenticated
  if (!isAuthenticated) {
    return <div>Please sign in to view this page.</div>;
  }

  // Vehicle not found
  if (!vehicle) {
    return <div>Vehicle not found.</div>;
  }

  return (
    <div className="p-6">
      {/* Vehicle Details Card */}
      <div className="mb-8">
        <header className="text-3xl font-bold mb-6">
          Vehicle Details
        </header>
        <VehicleDetailsCard vehicleId={Number(vehicleId)} />
      </div>

      {/* Calendar and Reservations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Calendar (1/3 width on large screens) */}
        <div className="lg:col-span-1 w-full">
          <h3 className="text-2xl font-semibold mb-4">Reservation Calendar</h3>
          {user ? (
            <ReservationCalendar
              reservations={reservations}
              user={user}
              vehicleId={Number(vehicleId)}
            />
          ) : (
            <div>Please log in to view the reservation calendar.</div>
          )}
        </div>

        {/* Current Reservations (2/3 width on large screens) */}
        <div className="lg:col-span-2 w-full">
          <h3 className="text-2xl font-semibold mb-4">Current Reservations</h3>
          <CurrentReservations vehicleId={Number(vehicleId)} />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
