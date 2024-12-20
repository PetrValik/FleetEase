import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext'; // User context for authentication
import VehicleDetailsCard from '../../components/vehicle/VehicleDetailCard'; // Vehicle details component
import ReservationCalendar from '../../components/vehicle/ReservationCalendar'; // Reservation calendar component
import { getReservationsByVehicleId, Reservation } from '../../database/reservations/reservations'; // Fetch reservations by vehicle ID
import { getVehicleById, Vehicle } from '../../database/vehicles/vehicles'; // Fetch vehicle details by ID
import { useParams } from 'react-router-dom'; // React Router for capturing vehicleId from URL

const VehicleDetailPage: React.FC = () => {
  const { isAuthenticated } = useUser(); // Get authentication status
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

  // If not authenticated, show message
  if (!isAuthenticated) {
    return <div>Please sign in to view this page.</div>; // Inform user to sign in
  }

  // If vehicle data is not found
  if (!vehicle) {
    return <div>Vehicle not found.</div>;  // Show message if vehicle not found
  }

  return (
    <div className="lg:flex">
      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="text-3xl font-bold mb-6">
          Vehicle Details
        </header>

        {/* Vehicle Details Card */}
        <VehicleDetailsCard vehicleId={Number(vehicleId)} /> {/* Pass vehicleId to VehicleDetailsCard */}

        {/* Reservation Calendar */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Reservation Calendar</h3>
          <ReservationCalendar reservations={reservations} />
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
