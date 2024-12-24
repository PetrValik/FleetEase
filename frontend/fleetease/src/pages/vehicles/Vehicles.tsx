import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import VehicleDetailsCard from '../../components/vehicle/VehicleDetailCard'; // Import the vehicle details card component
// Zakomentovaný problémový import
// import ReservationCalendar from '../../components/vehicle/ReservationCalendar';
import { getReservationsByVehicleId, Reservation } from '../../database/reservations/reservations'; // Import the reservation API
import { getVehicleById, Vehicle } from '../../database/vehicles/vehicles'; // Import the vehicle API

const VehicleDetailPage: React.FC = () => {
  const { isAuthenticated } = useUser(); // Get authentication status
  const [vehicleId] = useState<number>(6); // Replace with dynamic ID or from URL
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Track if data is loading

  // Fetch data using useEffect hook
  useEffect(() => {
    const fetchVehicleData = async () => {
      const vehicleData = await getVehicleById(vehicleId);
      setVehicle(vehicleData);
    };

    const fetchReservations = async () => {
      const fetchedReservations = await getReservationsByVehicleId(vehicleId);
      setReservations(fetchedReservations);
    };

    // Only fetch data if the user is authenticated
    if (isAuthenticated) {
      fetchVehicleData();
      fetchReservations();
    }

    setIsLoading(false);  // Set loading to false after data is fetched (or when the user is not authenticated)
  }, [vehicleId, isAuthenticated]); // Runs when vehicleId or isAuthenticated changes

  // Check loading state
  if (isLoading) {
    return <div>Loading...</div>;  // Show loading state while the data is being fetched
  }

  // If not authenticated, inform the user without redirecting
  if (!isAuthenticated) { // nenastane
    return <div>Please sign in to view this page.</div>; // Inform the user to sign in if not authenticated
  }

  // If vehicle data is not found
  if (!vehicle) {
    return <div>Loading vehicle data...</div>;  // Show loading message if vehicle data is not available
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
        <VehicleDetailsCard vehicleId={vehicleId} />

       {/* Reservation Calendar */}
<div className="mt-8">
  <h3 className="text-2xl font-semibold mb-4">Reservation Calendar</h3>
  {/* <ReservationCalendar reservations={reservations} /> */}
</div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
