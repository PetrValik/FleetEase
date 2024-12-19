import React, { useState } from 'react';
import { Vehicle } from '../../database/vehicles/mocks'; // Import mock data
import { Edit, Trash2 } from 'lucide-react'; // Importing the icons from lucide-react
import EditVehicleModal from './modals/EditVehicleModal'; // Import the new modal component
import DeleteButton from './ui/DeleteButton'; // Import the DeleteButton component

interface VehicleDetailsCardProps {
  vehicle: Vehicle;
}

const VehicleDetailsCard: React.FC<VehicleDetailsCardProps> = ({ vehicle }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for the delete confirmation modal
  const [updatedVehicle, setUpdatedVehicle] = useState<Vehicle>(vehicle);

  // Handle modal open/close for edit
  const handleOpenModal = () => setIsEditModalOpen(true);
  const handleCloseModal = () => setIsEditModalOpen(false);

  // Handle save (onSave) from the edit modal
  const handleSave = (newVehicle: Vehicle) => {
    setUpdatedVehicle(newVehicle);
    handleCloseModal();
    console.log('Updated Vehicle:', newVehicle); // This can be replaced with an API call to update the vehicle
  };

  // Handle deletion (this will be replaced with actual delete functionality, like an API call)
  const handleDelete = (vehicleId: number) => {
    console.log(`Vehicle with ID: ${vehicleId} has been deleted`); // Replace with an API call for deletion
    setIsDeleteModalOpen(false); // Close the delete modal after deletion
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full mr-4">
          {/* Replace this with an actual vehicle icon or image */}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{updatedVehicle.brand} {updatedVehicle.model}</h2>
          <p className="text-gray-600 text-sm">{updatedVehicle.registrationNumber}</p>
        </div>
        <span
          className={`ml-auto px-4 py-2 text-sm font-semibold rounded-full ${
            updatedVehicle.status === 'In Use'
              ? 'bg-blue-500 text-white'
              : updatedVehicle.status === 'Available'
              ? 'bg-green-500 text-white'
              : updatedVehicle.status === 'Maintenance'
              ? 'bg-red-500 text-white'
              : 'bg-gray-500 text-white'
          }`}
        >
          {updatedVehicle.status}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold">Vehicle Details</h3>
          <p><strong>VIN:</strong> {updatedVehicle.vin}</p>
          <p><strong>Year:</strong> {updatedVehicle.year}</p>
          <p><strong>Color:</strong> {updatedVehicle.color}</p>
          <p><strong>Capacity:</strong> {updatedVehicle.capacity}</p>
        </div>
        <div>
          <h3 className="font-semibold">Technical Specifications</h3>
          <p><strong>Fuel Type:</strong> {updatedVehicle.fuelType}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Current Assignment</h3>
        {updatedVehicle.driver ? (
          <p><strong>Driver:</strong> {updatedVehicle.driver}</p>
        ) : (
          <p>No driver assigned.</p>
        )}
        <p><strong>Assignment Period:</strong> {updatedVehicle.assignmentPeriod || 'N/A'}</p>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center" onClick={handleOpenModal}>
          <Edit className="mr-2" />
          Edit
        </button>
        <DeleteButton
          vehicleId={updatedVehicle.id}
          vehicleRegistrationNumber={updatedVehicle.registrationNumber}
          onDelete={handleDelete} // Trigger the delete function on confirmation
        />
      </div>

      {/* Edit Vehicle Modal */}
      <EditVehicleModal
        vehicle={updatedVehicle}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default VehicleDetailsCard;
