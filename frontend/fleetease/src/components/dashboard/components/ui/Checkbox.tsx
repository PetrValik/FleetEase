import React from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

const CustomCheckbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <div
        className={`w-5 h-5 flex items-center justify-center border-2 rounded ${
          checked ? 'bg-blue-600 border-blue-600' : 'border-gray-400'
        }`}
        onClick={onChange}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.586 4.707 10.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

export default CustomCheckbox;
