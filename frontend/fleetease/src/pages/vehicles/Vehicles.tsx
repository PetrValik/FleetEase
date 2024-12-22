import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext'; // User context for authentication
import VehicleDetailsCard from '../../components/vehicle/VehicleDetailCard'; // Vehicle details component
import ReservationCalendar from '../../components/vehicle/ReservationCalendar'; // Reservation calendar component
import CurrentReservations from '../../components/vehicle/CurrentReservations'; // Import the new CurrentReservations component
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
      const vehicleData = await getVehicleById(Number(vehicleId)); // Fetch vehicle by ID (ensure it's a number)
      setVehicle(vehicleData); // Store vehicle details
    };

    const fetchReservations = async () => {
      const fetchedReservations = await getReservationsByVehicleId(Number(vehicleId)); // Fetch reservations
      setReservations(fetchedReservations); // Store reservations
    };

    // Only fetch data if the user is authenticated
    if (isAuthenticated && vehicleId) {
      fetchVehicleData(); // Fetch vehicle data
      fetchReservations(); // Fetch reservations data
    }

    setIsLoading(false); // Set loading to false after fetching
  }, [vehicleId, isAuthenticated]); // Dependency array to re-fetch if vehicleId or authentication changes

  // Check loading state
  if (isLoading) {
    return <div>Loading...</div>;  // Show loading message while fetching data
  }

  // If not authenticated, inform the user without redirecting
  if (!isAuthenticated) { // nenastane
    return <div>Please sign in to view this page.</div>; // Inform the user to sign in if not authenticated
  }

  // If vehicle data is not found
  if (!vehicle) {
    return <div>Vehicle not found.</div>;  // Show message if vehicle not found
  }

  return (
    <div className="p-6">
      {/* Vehicle Details Card */}
      <div className="mb-8">
        <header className="text-3xl font-bold mb-6">
          Vehicle Details
        </header>
        <VehicleDetailsCard vehicleId={Number(vehicleId)} /> {/* Pass vehicleId to VehicleDetailsCard */}
      </div>

      {/* Reservation Calendar and Current Reservations (same row) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Reservation Calendar */}
        <div className="flex justify-center items-center w-full">
          <div className="w-full max-w-4xl">
            <h3 className="text-2xl font-semibold mb-4">Reservation Calendar</h3>
            {/* Only render ReservationCalendar if user is not null */}
            {user ? (
              <ReservationCalendar reservations={reservations} user={user} />
            ) : (
              <div>Please log in to view the reservation calendar.</div>
            )}
          </div>
        </div>

        {/* Right Column: Current Reservations */}
        <div className="w-full">
          <h3 className="text-2xl font-semibold mb-4">Current Reservations</h3>
          {/* Display CurrentReservations component */}
          <CurrentReservations vehicleId={Number(vehicleId)} /> {/* Pass vehicleId to CurrentReservations */}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
