import React from 'react';
import { VehicleCard } from './VehicleCard'; // Importing VehicleCard component
import { Vehicle } from '../../../database/vehicles/vehicles'; // Import Vehicle type

interface VehicleListProps {
  vehicles: Vehicle[]; // Define the type of the 'vehicles' prop
}

const mockData = [
  {
    vehicle_id: 1,
    brand: "Ford",
    model: "F-150",
    registration_number: "ABC 1234",
    fuel_type: "Gasoline",
    vehicle_status: "Available",
    registration_state: "Czechia",
    vin: "1FTFW1E56DKE38490",
  },
  {
    vehicle_id: 2,
    brand: "Tesla",
    model: "Model 3",
    registration_number: "XYZ 5678",
    fuel_type: "Electric",
    vehicle_status: "In Use",
    registration_state: "Germany",
    vin: "5YJ3E1EA7KF263874",
  },
  {
    vehicle_id: 3,
    brand: "Toyota",
    model: "Corolla",
    registration_number: "LMN 9876",
    fuel_type: "Hybrid",
    vehicle_status: "Maintenance",
    registration_state: "Poland",
    vin: "2T1BURHE2KC088120",
  }
];

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  // For now, using the mock data as the vehicles prop
  const dataToDisplay = vehicles.length > 0 ? vehicles : mockData;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {dataToDisplay.map((vehicle) => (
        <VehicleCard
          key={vehicle.vehicle_id}
          id={vehicle.vehicle_id.toString()} // Ensure each card has a unique key
          name={`${vehicle.brand || "Unknown Brand"} ${vehicle.model || "Unknown Model"}`} // Temporarily fallback to 'Unknown'
          registrationNumber={vehicle.registration_number || "N/A"} // Fallback to 'N/A' if registration number is missing
          fuelType={vehicle.fuel_type || "N/A"} // Fallback to 'N/A' if fuel type is missing
          driver={"N/A"} // Placeholder for driver
          assignmentPeriod={"N/A"} // Placeholder for assignment period
          status={vehicle.vehicle_status || "Available"} // Fallback to 'Available' for status
        />
      ))}
    </div>
  );
};

export default VehicleList;
