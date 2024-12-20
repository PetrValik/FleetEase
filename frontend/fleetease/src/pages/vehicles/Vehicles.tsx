import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using react-router
import VehicleDetailsCard from '../../components/vehicle/VehicleDetailCard'; // Import the VehicleDetailsCard component
import { getVehicleById } from '../../database/vehicles/vehicles'; // Import the API method for fetching a vehicle
import { Vehicle } from '../../database/vehicles/vehicles';  // Import the Vehicle type

const VehicleDetailPage: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>(); // Get vehicle ID from the URL
  const [vehicle, setVehicle] = useState<Vehicle | null>(null); // Store the vehicle data
  const [loading, setLoading] = useState<boolean>(true); // Loading state for fetching vehicle
  const [error, setError] = useState<string | null>(null); // Error state to display error messages

  useEffect(() => {
    const fetchVehicle = async () => {
      if (vehicleId) {
        try {
          const fetchedVehicle = await getVehicleById(Number(vehicleId)); // Fetch the vehicle using the API
          setVehicle(fetchedVehicle);
        } catch (error) {
          setError('Failed to fetch vehicle details.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchVehicle();
  }, [vehicleId]); // Dependency on vehicleId to fetch when it changes

  if (loading) {
    return <p>Loading vehicle details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!vehicle) {
    return <p>Vehicle not found or has been deleted.</p>;
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Vehicle Details</h1>

      {/* Vehicle Details Card */}
      <VehicleDetailsCard vehicleId={vehicleId ? Number(vehicleId) : 0} /> {/* Pass vehicleId to VehicleDetailsCard */}
    </div>
  );
};

export default VehicleDetailPage;
