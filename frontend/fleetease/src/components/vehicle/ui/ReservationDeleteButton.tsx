import React from 'react';

interface DeleteButtonProps {
  onDelete: () => void;
  itemName?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, itemName }) => {
  const handleClick = () => {
    const confirmMessage = itemName
      ? `Are you sure you want to delete ${itemName}?`
      : 'Are you sure you want to delete this item?';
      
    if (window.confirm(confirmMessage)) {
      onDelete();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
