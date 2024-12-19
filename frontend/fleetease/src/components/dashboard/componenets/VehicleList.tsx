import React from "react";
import { VehicleCard } from "./VehicleCard"; // Importing VehicleCard component
import { Vehicle } from "../../../database/vehicles/mocks"; // Assuming Vehicle type and mock data

interface VehicleListProps {
  vehicles: Vehicle[]; // Accepts a list of vehicles as a prop
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id} // Ensure each card has a unique key
          id={vehicle.id.toString()} // Convert id to string
          name={`${vehicle.brand} ${vehicle.model}`} // Combine brand and model as the name
          registrationNumber={vehicle.registrationNumber} // Pass registration number
          fuelType={vehicle.fuelType} // Pass fuel type
          driver={vehicle.driver} // Pass driver (optional)
          assignmentPeriod={vehicle.assignmentPeriod} // Pass assignment period (optional)
          status={vehicle.status} // Pass status
        />
      ))}
    </div>
  );
};

export default VehicleList;
