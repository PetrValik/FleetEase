import React from 'react';

interface AuthInputProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
}

const AuthInput: React.FC<AuthInputProps> = ({ id, type, label, placeholder }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
      />
    </div>
  );
};

export default AuthInput;

