import React, { useState } from 'react';
import { DeleteConfirmationModal } from '../modals/DeleteConfirmationModal';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  vehicleId: number;
  vehicleRegistrationNumber: string;
  onDelete: (vehicleId: number) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ vehicleId, vehicleRegistrationNumber, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true); // Show the confirmation modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal if user clicks "Cancel"
  };

  const handleConfirmDelete = () => {
    onDelete(vehicleId); // Proceed with the deletion process
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <button
        onClick={handleDeleteClick}
        className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center"
      >
        <Trash2 size={20} />
        <span>Delete</span>
      </button>

      {isModalOpen && (
        <DeleteConfirmationModal
          vehicleId={vehicleId}
          vehicleRegistrationNumber={vehicleRegistrationNumber}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default DeleteButton;
