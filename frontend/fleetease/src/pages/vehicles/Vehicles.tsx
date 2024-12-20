import React from 'react';
import VehicleDetailsCard from '../../components/vehicle/VehicleDetailCard';
import ReservationCalendar from '../../components/vehicle/ReservationCalendar';
import { mockVehicles } from '../../database/vehicles/mocks'; // Import mock vehicles from the mocks file

const VehicleDetailPage: React.FC = () => {
  // You can select the vehicle from the mockVehicles array
  const vehicle = mockVehicles[0]; // Assuming you want to use the first vehicle from the mock data

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Vehicle Details</h1>
      
      {/* Vehicle Details Card */}
      <VehicleDetailsCard vehicleId={vehicle.vehicle_id} /> {/* Pass vehicle_id as vehicleId */}
      
      {/* Reservation Calendar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Reservation Calendar</h2>
        <ReservationCalendar vehicleId={vehicle.vehicle_id.toString()} /> {/* Convert vehicle.id to string */}
      </div>
    </div>
  );
};

export default VehicleDetailPage;
