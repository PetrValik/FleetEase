import React from 'react';

interface TestButtonProps {
  label: string;
  onClick: () => void;
}

const TestButton: React.FC<TestButtonProps> = ({ label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors mr-2 mb-2"
    >
      {label}
    </button>
  );
};

export default TestButton;

