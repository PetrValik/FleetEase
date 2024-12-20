import React, { useState, useEffect } from 'react';
import { getVehicleById, updateVehicle, deleteVehicle, Vehicle } from '../../database/vehicles/vehicles'; // Import API methods
import { Edit, Trash2 } from 'lucide-react'; // Importing the icons from lucide-react
import EditVehicleModal from './modals/EditVehicleModal'; // Import the Edit Modal component
import DeleteButton from './ui/DeleteButton'; // Import the DeleteButton component

interface VehicleDetailsCardProps {
  vehicleId: number; // Use vehicle ID instead of the full vehicle object
}

const VehicleDetailsCard: React.FC<VehicleDetailsCardProps> = ({ vehicleId }) => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null); // Vehicle state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for the delete confirmation modal
  const [loading, setLoading] = useState(true); // State to track loading

  // Fetch the vehicle details by ID
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const fetchedVehicle = await getVehicleById(vehicleId);
        setVehicle(fetchedVehicle);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  // Handle modal open/close for edit
  const handleOpenModal = () => setIsEditModalOpen(true);
  const handleCloseModal = () => setIsEditModalOpen(false);

  // Handle save (onSave) from the edit modal
  const handleSave = async (updatedVehicle: Vehicle) => {
    try {
      const { vehicle_id, ...updateData } = updatedVehicle; // Exclude vehicle_id from the update payload
      const savedVehicle = await updateVehicle(vehicleId, updateData); // Pass only the update data
      if (savedVehicle) {
        setVehicle(savedVehicle);
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
    } finally {
      handleCloseModal();
    }
  };

  // Handle deletion
  const handleDelete = async () => {
    try {
      const success = await deleteVehicle(vehicleId);
      if (success) {
        console.log(`Vehicle with ID: ${vehicleId} has been deleted`);
        setIsDeleteModalOpen(false);
        setVehicle(null); // Clear the vehicle state after deletion
      }
    } catch (error) {
      console.error(`Error deleting vehicle with ID: ${vehicleId}`, error);
    }
  };

  if (loading) {
    return <p>Loading vehicle details...</p>;
  }

  if (!vehicle) {
    return <p>Vehicle not found or deleted.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full mr-4">
          {/* Placeholder for vehicle image */}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{vehicle.model_id} (Brand ID: {vehicle.category_id})</h2>
          <p className="text-gray-600 text-sm">{vehicle.registration_number}</p>
        </div>
        <span
          className={`ml-auto px-4 py-2 text-sm font-semibold rounded-full ${
            vehicle.vehicle_status === 'In Use'
              ? 'bg-blue-500 text-white'
              : vehicle.vehicle_status === 'Available'
              ? 'bg-green-500 text-white'
              : vehicle.vehicle_status === 'Maintenance'
              ? 'bg-red-500 text-white'
              : 'bg-gray-500 text-white'
          }`}
        >
          {vehicle.vehicle_status}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold">Vehicle Details</h3>
          <p><strong>VIN:</strong> {vehicle.vin}</p>
          <p><strong>Year:</strong> {vehicle.created_at}</p> {/* Replace with proper year field */}
          <p><strong>Color:</strong> Not available</p> {/* Replace with actual color field */}
          <p><strong>Capacity:</strong> Not available</p> {/* Replace with actual capacity field */}
        </div>
        <div>
          <h3 className="font-semibold">Technical Specifications</h3>
          <p><strong>Fuel Type:</strong> {vehicle.fuel_type}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center" onClick={handleOpenModal}>
          <Edit className="mr-2" />
          Edit
        </button>
        <DeleteButton
          vehicleId={vehicle.vehicle_id}
          vehicleRegistrationNumber={vehicle.registration_number}
          onDelete={handleDelete} // Trigger the delete function on confirmation
        />
      </div>

      {/* Edit Vehicle Modal */}
      <EditVehicleModal
        vehicle={vehicle}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default VehicleDetailsCard;
