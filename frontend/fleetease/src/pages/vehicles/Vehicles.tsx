import React from 'react';
import VehicleDetailsCard from '../../components/vehicle/VehicleDetailCard'; // Import VehicleDetailsCard
import ReservationCalendar from '../../components/vehicle/ReservationCalendar'; // Assuming you have a ReservationCalendar component
import { Vehicle } from '../../database/vehicles/mocks'; // Import the Vehicle type

const VehicleDetailPage: React.FC = () => {
  // Full vehicle data matching the Vehicle interface
  const vehicle: Vehicle = {
    id: 1,
    vehicleType: 'Car',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    registrationNumber: 'ABC 1234',
    vin: '1HGCM82633A123456',
    color: 'Blue',
    status: 'Available',
    capacity: '5 passengers',
    fuelType: 'Gasoline',
    equipment: 'Air Conditioning, GPS',
    owner: 'FleetEase Rentals',
    driver: 'John Doe',
    assignmentPeriod: '01 Jan 2023 - 31 Dec 2023',
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Vehicle Details</h1>
      
      {/* Vehicle Details Card */}
      <VehicleDetailsCard vehicle={vehicle} />
      
      {/* Reservation Calendar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Reservation Calendar</h2>
        <ReservationCalendar vehicleId={vehicle.id.toString()} /> {/* Convert vehicle.id to string */}
      </div>
    </div>
  );
};

export default VehicleDetailPage;
