import React from 'react';
import { Vehicle } from '../../../database/vehicles/vehicles'; // Import the Vehicle type
import { VehicleCard } from './VehicleCard'; // Import the VehicleCard component

// Define the props type for VehicleList
interface VehicleListProps {
  vehicles: Vehicle[]; // This prop expects an array of Vehicle objects
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  return (
    <div>
      {vehicles.length === 0 ? (
        <div>No vehicles available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.vehicle_id}
              id={String(vehicle.vehicle_id)} // Pass vehicle_id as string
              modelId={vehicle.model_id} // Pass model_id
              registrationNumber={vehicle.registration_number} // Pass registration_number
              fuelType={vehicle.fuel_type} // Pass fuel_type
              status={vehicle.vehicle_status as "Available" | "In Use" | "Maintenance" | "Reserved" | "Disabled"} // Ensure status matches the enum
              // You can add optional fields like 'driver' and 'assignmentPeriod' if you have this data
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleList;
