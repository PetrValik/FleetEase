// DeleteConfirmationModal.tsx
import React from 'react';

interface DeleteConfirmationModalProps {
  vehicleId: number;
  vehicleRegistrationNumber: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  vehicleId,
  vehicleRegistrationNumber,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
        <p>
          You are about to delete vehicle {vehicleRegistrationNumber}. This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
